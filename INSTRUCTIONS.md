# Development Instructions

This project is set up as a **Monorepo** using NPM Workspaces. This allows you to develop the framework and test it in a template application simultaneously.

## 1. The "Monorepo" Workflow (Recommended)

**Best for:** Active development, adding new components, fixing bugs in the framework.

In this workflow, your App (`packages/template`) and your Framework (`packages/framework`) live together. The template is linked directly to the local framework source.

### Structure
- **packages/framework**: The source code for your UI library.
- **packages/template**: A demo/starter app that consumes the framework.

### How to Work
1.  **Start the Dev Server**:
    Run the following command from the root to start the template app:
    ```bash
    npm run dev
    ```
    (This runs `npm run dev -w packages/template`)

2.  **Making Changes**:
    - If you edit a file in `packages/framework/src/components/...`, the change will be reflected immediately in the running template app (thanks to Vite's HMR).
    - If you change TypeScript types or exports in the framework, you may need to run the build command to update the definitions:
      ```bash
      npm run build:framework
      ```

3.  **Creating a New App**:
    To start a real application while keeping this workflow, simply duplicate the `packages/template` folder inside the `packages/` directory (e.g., `packages/my-dashboard`). It will automatically inherit the workspace links.

---

## 2. The "Consumer" Workflow (Production / Distribution)

**Best for:** Using the stable framework in a completely separate project, or sharing it with other developers.

In this workflow, the framework is treated like any other third-party library (like `vue` or `axios`).

### How to "Graduate" to a Standalone Project

If you want to use your framework in a project *outside* of this folder (e.g., on a different computer or in a different repo), follow these steps:

1.  **Pack the Framework**:
    Open a terminal in `packages/framework` and run:
    ```bash
    npm pack
    ```
    This creates a tarball file (e.g., `my-admin-framework-0.0.1.tgz`) in the framework directory. This file acts like a local NPM package.

2.  **Create a New Project**:
    Create a fresh Vue project anywhere on your machine (or copy the contents of `packages/template` to a new folder).

3.  **Install the Framework**:
    In your new project, install the tarball you created in step 1:
    ```bash
    npm install /path/to/your/repo/packages/framework/my-admin-framework-0.0.1.tgz
    ```
    
    *Alternatively, update `package.json` manually:*
    ```json
    "dependencies": {
      "my-admin-framework": "file:c:/Users/Andy/source/repos/MyAdminFramework/packages/framework/my-admin-framework-0.0.1.tgz"
    }
    ```

4.  **Run**:
    ```bash
    npm install
    npm run dev
    ```

### Publishing to NPM (Optional)
To share with the world, you would run `npm publish` from the `packages/framework` directory. Then, anyone could run `npm install my-admin-framework`.

---

## Summary Recommendation

**Stick with the Monorepo Workflow for now.** 
As long as you are actively adding features (like "Pro" components) or tweaking styles, the feedback loop in the monorepo is much faster. You don't need to pack/install every time you make a change.
