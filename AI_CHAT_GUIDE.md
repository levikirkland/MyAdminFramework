# AI Chat Feature

A modern AI chat interface similar to LM Studio and Ollama, integrated into MyAdminFramework.

## Features

- **Chat Sessions Management**: Create multiple chat sessions with automatic history grouping (Today, Yesterday, Previous 7 Days)
- **Model Selection**: Choose from various AI models (Llama 3.2, Mistral, Codellama, Phi-3, Gemma 2, etc.)
- **Markdown Support**: Rich text rendering with code syntax highlighting
- **Responsive Design**: Collapsible sidebar and mobile-friendly interface
- **Message Actions**: Copy messages, regenerate responses
- **Customizable Settings**:
  - Temperature control (0-2)
  - Max tokens
  - System prompt
  - API endpoint configuration
- **Persistent Storage**: Chat sessions and settings saved to localStorage
- **Typing Indicators**: Visual feedback during AI response generation
- **Suggestion Chips**: Quick-start prompts for new conversations

## Setup Instructions

### 1. Install Ollama

Download and install Ollama from [https://ollama.com](https://ollama.com)

**Windows/Mac/Linux:**
```bash
# Visit https://ollama.com/download and install for your OS
```

### 2. Pull Models

After installing Ollama, pull the models you want to use:

```bash
# Pull Llama 3.2 (recommended)
ollama pull llama3.2

# Pull other models
ollama pull mistral
ollama pull codellama
ollama pull phi3
ollama pull gemma2
```

### 3. Start Ollama Server

Ollama should start automatically, but you can also start it manually:

```bash
ollama serve
```

The server runs on `http://localhost:11434` by default.

### 4. Configure the AI Chat

1. Navigate to the AI Chat page in your application
2. Click the **Settings** icon in the header
3. Configure:
   - **API Endpoint**: `http://localhost:11434/api/chat` (default)
   - **Temperature**: 0.7 (adjust for creativity)
   - **Max Tokens**: 4096 (or as needed)
   - **System Prompt**: Customize the AI's behavior

### 5. Start Chatting!

- Click "New Chat" to start a conversation
- Type your message and press Enter (or click Send)
- Use Shift+Enter for multi-line messages
- Switch between chat sessions in the sidebar
- Copy or regenerate responses as needed

## Using Alternative APIs

The AI Chat component supports any OpenAI-compatible API. To use alternatives:

### LM Studio
1. Start LM Studio and load a model
2. Go to the "Local Server" tab
3. Start the server (usually on `http://localhost:1234`)
4. Update the endpoint in AI Chat settings to: `http://localhost:1234/v1/chat/completions`

### OpenAI API
Update settings:
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- Add your API key in the code (see Customization section)

### Other Compatible APIs
Any API that follows the OpenAI chat completion format should work.

## Customization

### Implementing Real API Calls

The component currently uses mock responses. To enable real API calls, edit [AiChat.vue](packages/template/src/views/AiChat.vue) and uncomment the real implementation in the `sendToAPI` function:

```typescript
const sendToAPI = async (message: string): Promise<string> => {
  // Replace the mock implementation with:
  const response = await fetch(settings.value.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: selectedModel.value,
      messages: [
        { role: 'system', content: settings.value.systemPrompt },
        ...currentSession.value!.messages.map(m => ({ 
          role: m.role, 
          content: m.content 
        }))
      ],
      stream: false,
      options: {
        temperature: settings.value.temperature,
        num_predict: settings.value.maxTokens
      }
    })
  })
  const data = await response.json()
  return data.message.content
}
```

### Adding Streaming Support

For streaming responses (like ChatGPT), modify the `sendToAPI` function to handle SSE (Server-Sent Events):

```typescript
const response = await fetch(settings.value.endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: selectedModel.value,
    messages: [...],
    stream: true  // Enable streaming
  })
})

const reader = response.body?.getReader()
const decoder = new TextDecoder()
let content = ''

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  
  const chunk = decoder.decode(value)
  // Parse and append chunk to content
  content += parseChunk(chunk)
  
  // Update UI with partial response
  currentSession.value!.messages[lastIndex].content = content
}
```

### Adding File Attachments

Implement the `attachFile` function to handle file uploads:

```typescript
const attachFile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*,application/pdf,.txt,.md'
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      // Handle file upload and include in message
      const base64 = await fileToBase64(file)
      // Include in API request
    }
  }
  input.click()
}
```

## Keyboard Shortcuts

- **Enter**: Send message
- **Shift+Enter**: New line in message
- **Ctrl/Cmd+K**: Open command palette (global)

## Troubleshooting

### "Connection refused" error
- Ensure Ollama is running: `ollama serve`
- Check the endpoint URL in settings
- Verify firewall isn't blocking connections

### Slow responses
- Try a smaller model (phi3 instead of llama3)
- Reduce max tokens
- Check system resources (Ollama is CPU/GPU intensive)

### Models not appearing
- Pull models first: `ollama pull <model-name>`
- List available models: `ollama list`

### Chat history not saving
- Check browser localStorage isn't disabled
- Clear cache and reload
- Check browser console for errors

## Dependencies

The AI Chat feature uses:
- **marked**: Markdown parsing
- **dompurify**: XSS protection for rendered HTML
- **Vue 3**: Reactive framework
- **MyAdminFramework**: UI components

## Future Enhancements

- [ ] File attachment support
- [ ] Image generation
- [ ] Code execution in sandbox
- [ ] Chat export (Markdown, PDF)
- [ ] Multi-modal support (images, audio)
- [ ] Conversation branching
- [ ] Token usage tracking
- [ ] Rate limiting
- [ ] Voice input/output
- [ ] Collaborative chats

## Contributing

To enhance the AI Chat feature:

1. Edit [AiChat.vue](packages/template/src/views/AiChat.vue)
2. Test with different models and APIs
3. Submit pull requests with improvements

## License

Part of MyAdminFramework - see main LICENSE file.
