import { apiFetch as _apiFetch } from '../api/client'
export async function apiFetch(path:string, opts:any={}){
  return _apiFetch(path, opts)
}
