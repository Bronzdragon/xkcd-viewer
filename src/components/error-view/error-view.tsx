import { useEffect, useState } from "react"

import styles from './error-view.module.css'

type ErrorViewProps = {
    queue: ErrorQueue
}

export default function ErrorView({ queue }: ErrorViewProps) {
    const [messages, setMessages] = useState(queue.getAllItems());
    useEffect(() => {
        const listener = (newItems: QueueEntry[]) => { setMessages(newItems) }
        queue.addListener(listener)
        return () => queue.removeListener(listener)
    }, [setMessages, queue])

    return <div className={styles.container}>
        {messages.map(({ message, id }) => <span key={id} className={styles.errorItem}>
            {`${id}: ${message}`}<button value="x" onClick={() => { queue.removeItem(id) }}>x</button>
        </span>)}
    </div>
}

type Message = {
    message: string
    timeout: number | "infinite"
}
type QueueEntry = {
    id: number
    message: string
}

type ErrorQueueListener = (queue: QueueEntry[]) => void

export class ErrorQueue {
    #queue: QueueEntry[] = []
    #idCounter = 0;
    #listeners: ErrorQueueListener[] = []

    addItem(message: string): void
    addItem(message: Message): void
    addItem(obj: string | Message) {
        const id = this.#idCounter++
        if (typeof obj === 'string') {
            this.#queue.push({ id, message: obj })

            this.#notifyListeners()
            return;
        }

        this.#queue.push({ id, message: obj.message })
        if (obj.timeout !== "infinite") {
            setTimeout(() => {
                this.removeItem(id)
            }, obj.timeout)
        }
    }

    getAllItems() {
        // make a deep copy, so that callers don't get access.
        return this.#queue.map(({ id, message }) => ({ id, message }))
    }

    addListener(listener: ErrorQueueListener) {
        this.#listeners.push(listener)
    }

    removeListener(listener: ErrorQueueListener) {
        const index = this.#listeners.indexOf(listener)
        if (index < 0) return;
        this.#listeners.splice(index, 1)
    }

    removeItem = (id: number) => {
        const index = this.#queue.findIndex((entry) => entry.id === id)
        if (index < 0) return;
        this.#queue.splice(index, 1);
        
        this.#notifyListeners()
    }

    #notifyListeners = () => {
        for (const listener of this.#listeners) {
            listener(this.getAllItems())
        }
    }
}
