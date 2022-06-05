import { getDatabase, ref, onValue, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface User {
    id: string
    name: string
}

interface Vote {
    name: string
    vote: number
}

interface Poker {
    name: string
    votes: Record<string, Vote>
    isVoteHidden: boolean
}

export default function Poker() {
    const [user, setUser] = useState<User | null>(null)
    const [poker, setPoker] = useState<Poker | null>(null)
    let params = useParams();

    async function addUserToVote(user: User) {
        const db = getDatabase();
        await update(ref(db, `plannings/${params.id}/votes/${user.id}`), 
        {
            name: user.name,
            vote: 0
        });
    }

    function vote(userId: string, vote: number) {
        return async function () {
            const db = getDatabase();
            await update(ref(db, `plannings/${params.id}/votes/${userId}`), 
            {
                vote
            });
        }
    }

    function showVotes() {
        const db = getDatabase();
        update(ref(db, `plannings/${params.id}`), 
        {
            isVoteHidden: false
        });
    }

    function hideVotes() {
        const db = getDatabase();
        update(ref(db, `plannings/${params.id}`), 
        {
            isVoteHidden: true
        });
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const parsedUser = JSON.parse(user)
            setUser(parsedUser)
            addUserToVote(parsedUser)
            return
        }
        const name = prompt("Please enter your name");
        const userId = Math.random().toString().substring(2)
        const newUser = {
            id: userId,
            name: name || '???'
        }
        localStorage.setItem('user', JSON.stringify(newUser))
        setUser(newUser)
        addUserToVote(newUser)

    }, [])

    useEffect(() => {
        if (!params.id) return
        const db = getDatabase();
        const starCountRef = ref(db, 'plannings/' + params.id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(1, data)
            if (data) {
                setPoker(data)
            }
        });
    }, [params.id])

    if (!poker || !user) return null

    return <div>
        <div>you can share this url with friends</div>
        <div>your name is {user?.name}</div>
        <div>poker name is {poker?.name}</div>
        <div>Votes 
            {poker.isVoteHidden && <button onClick={showVotes}>show votes</button>}
            {!poker.isVoteHidden && <button onClick={hideVotes}>hide votes</button>}
        </div>
        <div>
            {Object.entries(poker?.votes || {}).map(([id, vote]) => {
                return <span key={id}>{vote.name}:{poker.isVoteHidden ? 'hidden' : vote.vote}, </span>
            })}
        </div>
    
        <div>Vote:</div>
        <div>
            <span onClick={vote(user.id, 1)}> 1 </span>|
            <span onClick={vote(user.id, 2)}> 2 </span>|
            <span onClick={vote(user.id, 4)}> 4 </span>|
            <span onClick={vote(user.id, 8)}> 8 </span>|
            <span onClick={vote(user.id, 13)}> 13 </span>
        </div>
        
        </div>
}