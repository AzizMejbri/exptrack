
window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "./openapi.json",       // ← point to your local OpenAPI JSON
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    validatorUrl: null            // optional, disables online validator
  });
};
