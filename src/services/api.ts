// services/api.ts
export const mockPost = async (endpoint: string, data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📡 POST to ${endpoint}`, data);
      resolve({
        success: true,
        endpoint,
        data,
        message: "Mock API call successful!",
      });
    }, 500); // simulate delay
  });
};
