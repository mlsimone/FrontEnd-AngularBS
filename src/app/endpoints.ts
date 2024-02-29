// Resources (WebAPIs) this application accesses and permissions needed
export const ms_graph_endpoint: string = 'https://graph.microsoft.com/v1.0/me'; // 'https://graph.microsoft.com'; //

export const protectedResources = {
  APIsimple: {
    // for azure endpoints:
    endpointItems: "https://datastore2mls.azurewebsites.net/api/Items",           
    endpointCategories: "https://datastore2mls.azurewebsites.net/api/Categories", 
    endpointImages: "https://datastore2mls.azurewebsites.net/api/Images",
    // for localhost endpoints:
    //endpointItems:  "https://localhost:7267/api/Items",
    //endpointCategories: "https://localhost:7267/api/Categories",
    //endpointImages:  "https://localhost:7267/api/Images",
    scopes: {
      // 2/29/24 for production
      read: ["api://bec404a1-7783-4501-a090-2e3f885a05ff/User.Read", "api://bec404a1-7783-4501-a090-2e3f885a05ff/User.ReadWrite"],
      write: ["api://bec404a1-7783-4501-a090-2e3f885a05ff/User.ReadWrite"]

      // 2/29/24 for localhost (testing)
      //read: ["api://98dafb7e-4022-44a7-804b-1e1a7cbc4639/User.Read", "api://98dafb7e-4022-44a7-804b-1e1a7cbc4639/User.ReadWrite"],
      //write: ["api://98dafb7e-4022-44a7-804b-1e1a7cbc4639/User.ReadWrite"]
    }
  }
}
