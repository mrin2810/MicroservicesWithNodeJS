# Kubernetes Overview

## Introduction

This repository contains notes and configurations for managing applications in Kubernetes, focusing on pods and deployments. It is designed to provide a clear understanding of how to create, manage, and interact with these Kubernetes resources.

## Key Concepts

### Pods

- **Definition**: A pod is the smallest deployable unit in Kubernetes, which can contain one or more containers.
- **Usage**: Pods are generally created directly when running simple applications. However, this approach is not the standard practice in production.

### Deployments

- **Definition**: A deployment is a higher-level abstraction in Kubernetes that manages a set of identical pods.
- **Primary Functions**:
  1. **Pod Management**: Ensures that the desired number of pods are always running. If a pod crashes or is deleted, the deployment will automatically create a new one.
  2. **Version Management**: Facilitates rolling updates. When updating an application, the deployment can gradually replace old pods with new ones, ensuring zero downtime.

### Configuration Files

- Kubernetes resources are defined using YAML configuration files. These files specify the desired state of the resource, such as the number of replicas, the container image to use, and other settings.
- Example of a simple pod configuration:
    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: posts
    spec:
      containers:
      - name: posts
        image: your-docker-id/posts:0.0.1
    ```

## Common Commands

### Pod Management

- **Create a Pod**: 
    ```bash
    kubectl apply -f <filename>.yaml
    ```
  
- **List Pods**: 
    ```bash
    kubectl get pods
    ```

- **Execute a Command in a Pod**:
    ```bash
    kubectl exec -it <pod-name> -- <command>
    ```

- **View Pod Logs**: 
    ```bash
    kubectl logs <pod-name>
    ```

- **Delete a Pod**: 
    ```bash
    kubectl delete pod <pod-name>
    ```

- **Describe a Pod**: 
    ```bash
    kubectl describe pod <pod-name>
    ```

### Deployment Management

- **Create a Deployment**: Future examples will show how to create a deployment to manage our application pods.
- **List Deployments**: 
    ```bash
    kubectl get deployments
    ```

- **Describe a Deployment**: 
    ```bash
    kubectl describe deployment <deployment-name>
    ```

## Next Steps

In the next section, we will write a configuration file to create a deployment for our post application. This will demonstrate how to manage multiple pods effectively and leverage the benefits of deployments in Kubernetes.
