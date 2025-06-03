# 🚀 Generate a `.env` File from an Azure DevOps Variable Group

Easily automate the creation of a `.env` file from an Azure DevOps Variable Group with this custom Azure Pipelines task.

---

## 📚 Overview

This custom task simplifies the management of environment variables by generating a standard `.env` file directly from your Azure DevOps Variable Groups, ensuring consistency and reducing manual errors. Both regular and secret variables defined in the Variable Group will be included in the generated `.env` file.

---

## 🚀 Usage in Azure Pipelines

Make sure the Variable Group is **imported** in your YAML using the `variables` instruction before running this task. For example:

```yaml
variables:
  - group: "YOUR_VARIABLE_GROUP_NAME"
```

Then, add the task to your YAML pipeline as follows:

```yaml
- task: create-env-file@1
  inputs:
    variableGroupName: "YOUR_VARIABLE_GROUP_NAME"
    outputPath: ".env"
```

## 📦 Example Variable Group

Suppose you have a Variable Group named `prueba-env-file` with the following variables:

![Variable Group](https://i.imgur.com/xZTHWX7.png)

We will use the next YAML pipeline to reference this variable group and create envfile

![Pipeline](https://i.imgur.com/eKaVATi.png)

After running the pipeline, if you try to print the variables in the Azure Pipeline execution environment, the variables will appear like this:

![view pipeline variables](https://i.imgur.com/mdgNRp0.png)

Instead, the `.env` file will display all the values exactly as shown in the following image:

![view pipeline variables](https://i.imgur.com/UT12ZB1.png)

---

## ⚙️ How It Works

The task executes the following steps:

1. **Reads Inputs**: Accepts the Variable Group name and the desired output path for the `.env` file.
2. **Authenticates**: Uses the system OAuth token to securely access the Azure DevOps REST API.
3. **Fetches Variable Group**: Retrieves the specified Variable Group and its variables.
4. **Generates `.env` File**: Writes the variables to a `.env` file in the specified location.
5. **Reports Outcome**: Marks the task as succeeded or failed based on the operation result.

---

## ✅ Requirements

- The pipeline must have **"Allow scripts to access the OAuth token"** enabled.
- The Variable Group must be linked to the pipeline and contain the required variables.

---

## 📝 Notes

- **Secret variables** are included in the generated `.env`.
- Ensure the Variable Group does not expose confidential information if the `.env` file will be publicly accessible.
- Only plain text variables are supported.
- For more information, refer to the [Azure DevOps documentation](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups).

---
