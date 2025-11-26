import React, { useEffect, useState } from 'react'
import { apiFetch } from '../utils/fetcher'

type Publication = {
  id:number, title:string, content:string, status:string
}

export default function Dashboard(){
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState<string|null>(null)
  const [pubs,setPubs]=useState<Publication[]>([])
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [filter,setFilter]=useState('')

  const fetchList = async () => {
    setLoading(true); setError(null)
    try{
      const data = await apiFetch(`/publications${filter?`?status=${filter}`:''}`)
      setPubs(data)
    }catch(err:any){
      setError(err.data?.error || 'Failed to load')
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchList() }, [filter])

  const createPub = async (e:React.FormEvent) => {
    e.preventDefault()
    try{
      await apiFetch('/publications', { method: 'POST', body: JSON.stringify({ publication: { title, content } }) })
      setTitle(''); setContent('')
      fetchList()
    }catch(err:any){
      alert(err.data?.errors?.join(', ') || 'Create failed')
    }
  }

  const del = async (id:number) => {
    if(!confirm('Delete?')) return
    try{
      await apiFetch(`/publications/${id}`, { method: 'DELETE' })
      fetchList()
    }catch(err:any){
      alert('Delete failed')
    }
  }

  const changeStatus = async (id:number, status:string) => {
    try{
      await apiFetch(`/publications/${id}/change_status`, { method: 'PATCH', body: JSON.stringify({ status }) })
      fetchList()
    }catch(err:any){
      alert('Status change failed')
    }
  }

  return (
    <div>
      <h2>Your Publications</h2>
      <div>
        <label>Filter:
          <select value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value=''>All</option>
            <option value='published'>Published</option>
            <option value='draft'>Draft</option>
            <option value='archived'>Archived</option>
          </select>
        </label>
      </div>

      <form onSubmit={createPub}>
        <input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder='Content' value={content} onChange={e=>setContent(e.target.value)} />
        <button type='submit'>Create</button>
      </form>

      {loading? <div>Loading...</div> : error? <div className='error'>{error}</div> : (
        <ul>
          {pubs.map(p=>(
            <li key={p.id}>
              <strong>{p.title}</strong> — {p.status}
              <div>
                {p.status !== 'published' && <button onClick={()=>changeStatus(p.id, 'published')}>Publish</button>}
                {p.status === 'published' && <button onClick={()=>changeStatus(p.id, 'draft')}>Unpublish</button>}
                <button onClick={()=>del(p.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
