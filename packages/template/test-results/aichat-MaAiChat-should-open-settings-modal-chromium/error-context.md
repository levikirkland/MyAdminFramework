# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - paragraph [ref=e5]: Proof of concept
    - heading "MyLLM Offline Chat" [level=1] [ref=e6]
    - paragraph [ref=e7]: MaAiAssistant provides the polished chat UI; you supply the model endpoint and prompt management. The controls can still mention Ollama, but every request stays on your machine.
  - generic [ref=e8]:
    - generic [ref=e9]:
      - generic [ref=e11]: Local assistant
      - button [ref=e14] [cursor=pointer]:
        - img [ref=e15]
    - paragraph [ref=e18]:
      - text: Point
      - strong [ref=e19]: endpoint
      - text: to your HTTP service and keep PyTorch/outside runtimes behind that layer.
  - generic [ref=e20]:
    - generic [ref=e21]:
      - generic [ref=e23]: Local backend
      - generic [ref=e24]:
        - paragraph [ref=e25]: Run a service (llama.cpp, GGUF, llama.cpp REST, etc.) inside your network so this UI never calls third-party APIs.
        - list [ref=e26]:
          - listitem [ref=e27]: Implement POST /v1/chat/completions or mirror the request contract the assistant expects.
          - listitem [ref=e28]: Attach authentication tokens or IP allow lists that match your research policies.
          - listitem [ref=e29]: Expose CORS for http://localhost:5173 so the front-end can reach the server during development.
    - generic [ref=e30]:
      - generic [ref=e32]: Model downloads
      - generic [ref=e33]:
        - paragraph [ref=e34]: Manage model files outside the client and load them inside the backend you control.
        - list [ref=e35]:
          - listitem [ref=e36]: Store GGUF/ONNX weights in a shared folder (e.g., C:/models/llama-13b).
          - listitem [ref=e37]: Configure your backend to reference that folder so you never need to bundle the weights in the frontend.
          - listitem [ref=e38]: Use the assistant to toggle instructions, not to swap providers.
    - generic [ref=e39]:
      - generic [ref=e41]: Observability & trust
      - paragraph [ref=e43]: Keep logs and telemetry within your infrastructure; surface usage stats only where safe.
```