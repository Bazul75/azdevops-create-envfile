import * as fs from "fs";
import * as path from "path";
import * as tl from "azure-pipelines-task-lib/task";

async function run() {
try {
    const groupName = tl.getInput('variableGroupName', true);
    const outputPath = tl.getInput('outputPath', true);
    const token = tl.getVariable("System.AccessToken")!;
    const project = tl.getVariable("System.TeamProject")!;
    const orgUrl = tl.getVariable("System.CollectionUri")!;

    if (!token) {
    throw new Error('System.AccessToken not available. Enable "Allow scripts to access OAuth token".');
    }

    const apiUrl = `${orgUrl}${project}/_apis/distributedtask/variablegroups?api-version=7.1-preview.2`;

    const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
    });

    if (!response.ok) {
    throw new Error(`Error fetching Variable Groups: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const groups = data.value;
    const group = groups.find(g => g.name === groupName);

    if (!group) {
    throw new Error(`Variable Group "${groupName}" not found in the project "${project}"`);
    }

    const lines = Object.entries(group.variables as Record<string, { value: string }>)
    .map(([key, obj]) => `${key}="${tl.getVariable(key)}"`);

    const fullPath = path.resolve(outputPath);
    fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');

    tl.setResult(tl.TaskResult.Succeeded, `Environment file created at: ${fullPath}`);
} catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
}
}
 
 run();