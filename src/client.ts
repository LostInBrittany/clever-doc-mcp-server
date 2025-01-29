import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["./dist/index.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    }
  }
);

await client.connect(transport);

// List prompts
const prompts = await client.listPrompts();

console.log("Prompts\n", prompts);

// Get a prompt
const prompt = await client.getPrompt({name: "best-cloud"});

console.log("Prompt `best-cloud`\n", prompt);

// List resources
const resources = await client.listResources();

console.log("Resources\n", resources);

// Read a resource
const resource = await client.readResource({ uri: "https://www.clever-cloud.com/developers/llms.txt"});

console.log("Resource `https://www.clever-cloud.com/developers/llms.txt`\n", resource);

// Call a tool
const result = await client.callTool({
  name: "get_clever_zones",
  arguments: {

  }
});

console.log("Tool `get_clever_zones`\n",result);

await client.close();