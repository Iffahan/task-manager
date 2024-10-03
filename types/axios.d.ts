// types/axios.d.ts
import { NuxtAxiosInstance } from '@nuxtjs/axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: NuxtAxiosInstance;
  }
}
