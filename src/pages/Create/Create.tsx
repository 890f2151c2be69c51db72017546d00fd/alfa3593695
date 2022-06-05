import { getDatabase, set, ref } from "firebase/database";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  async function handleCreate() {  
    const db = getDatabase();
    const id = Math.random().toString().substring(2)
    await set(ref(db, 'plannings/' + id), {
      name,
      isVoteHidden: true
    });
    navigate(`/${id}`)
  }

  function handleNameChange(ev: ChangeEvent<HTMLInputElement>) {
    setName(ev.target.value)
  }
    return (
      <div>
        <input type="text" onChange={handleNameChange} />
        <button onClick={handleCreate}>create</button>
      </div>
    );
  }