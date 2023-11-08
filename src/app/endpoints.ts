// Resources (WebAPIs) this application accesses and permissions needed
export const ms_graph_endpoint: string = 'https://graph.microsoft.com/v1.0/me'; // 'https://graph.microsoft.com'; //

export const protectedResources = {
  APIsimple: {
    endpointItems: " https://localhost:7267/api/Items",           // https://dataaccessrestfulapi.azurewebsites.net/api/Items
    endpointCategories: "https://localhost:7267/api/Categories",  // https://dataaccessrestfulapi.azurewebsites.net/api/Categories
    endpointImages: "https://localhost:7267/api/Images",          //  https://dataaccessrestfulapi.azurewebsites.net/api/Images
    scopes: {
      read: ["api://bec404a1-7783-4501-a090-2e3f885a05ff/User.Read", "api://bec404a1-7783-4501-a090-2e3f885a05ff/User.ReadWrite"],
      write: ["api://bec404a1-7783-4501-a090-2e3f885a05ff/User.ReadWrite"]
    }
  }
}
