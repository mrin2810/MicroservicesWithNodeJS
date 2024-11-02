# Kubernetes Quick Start Guide

In this section, we will ensure that Kubernetes is properly set up and provide an overview of its workflow.

## Verifying Kubernetes Installation

1. **Open a New Terminal Window**:
   - It’s important to open a new terminal window, even if you already have one open.

2. **Check Kubernetes Version**:
   - Run the command: 
     ```bash
     kubectl version
     ```
   - This command will display the client and server versions of Kubernetes. It's okay if you have a newer version than the one presented in this guide; newer versions may include features not used in this course.

## Overview of Kubernetes Workflow

### Key Concepts
- Kubernetes orchestrates multiple containers, managing their creation, operation, and intercommunication.
- In this course, you'll learn key terms and concepts, but you do not need to memorize everything at this point.

### Workflow Diagram Overview
1. **Building an Image**:
   - Start with your source code and a Dockerfile.
   - Build the Docker image for your application (e.g., post service).

2. **Creating Containers**:
   - Use the image to create instances (containers) of your application.

3. **Nodes in a Kubernetes Cluster**:
   - A **node** is a virtual machine that runs containers.
   - If you are using Kubernetes locally, you likely have a single node.

4. **Configuration File**:
   - Create a configuration file to instruct Kubernetes to deploy containers.
   - Specify how many instances of your application to create (e.g., 2 copies of the post image).

5. **Deployment**:
   - A **deployment** manages the specified number of pods. 
   - If a pod crashes or stops, the deployment will ensure it is recreated.

6. **Pods and Containers**:
   - A **pod** can encapsulate one or more containers.
   - For simplicity in this course, we will use "pod" and "container" interchangeably.

7. **Creating a Service**:
   - A **service** abstracts networking complexities, allowing different pods to communicate easily.
   - Instead of hardcoding IP addresses and ports, you can use a simple service name (e.g., `post-service`) to access your application.

## Conclusion
This overview provided insight into how Kubernetes operates and the key concepts that will guide your learning. In the next video, we'll highlight important terminology and start implementing the workflow discussed.

## Additional Resources
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [kubectl Command Reference](https://kubernetes.io/docs/reference/kubectl/overview/)

# Kubernetes Configuration Files Overview

In this section, we'll explore the configuration files used to create pods, services, and deployments in Kubernetes. 

## Understanding Configuration Files

### Purpose of Config Files
- Configuration files define the **objects** in Kubernetes, which include:
  - Deployments
  - Pods
  - Services

### YAML Syntax
- All config files are written in YAML syntax, which is straightforward and similar to JSON, but with fewer curly braces.
- If you’re unfamiliar with YAML, don’t worry; it’s easy to learn, especially if you know JSON.

### Importance of Configuration Files
- **Documentation**: These files serve as documentation for your Kubernetes cluster, explaining the deployments, services, and pods you’ve created.
- **Source Control**: Always store config files alongside your projects and commit them to version control systems (like Git). This practice allows other engineers to understand the current setup of your cluster.

### Recommended Practices
- **Avoid Command-Line Creation**: Do not create Kubernetes objects directly via command-line commands. Always use configuration files instead.
- **Production Environment**: The config files are essential for maintaining clarity and consistency in production. Relying on command-line commands can lead to confusion and mismanagement.

### Common Misconceptions
- Some documentation and blog posts may suggest creating objects directly via command-line commands. While it may work for testing, it’s not advisable for production environments. 
- Treat configuration files as your primary means of defining and managing Kubernetes objects to ensure clarity and maintainability.

## Next Steps
In the next video, we will write our first configuration file. Stay tuned!
