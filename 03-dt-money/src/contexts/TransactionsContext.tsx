import { ReactNode, useEffect, useState, useCallback } from "react"
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transactions {
  id: number,
  category: string,
  createdAt: string,
  description: string,
  price: number,
  type: 'income' | 'outcome'

}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionsContextType {
  transactions: Transactions[]
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise <void>
}

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  const fetchTransactions = useCallback(async(query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data)
  },[])

  const createTransaction = useCallback(async(data: CreateTransactionInput) => {
    const { description, category, price, type } = data;

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data, ...state])
  }, [])

  useEffect(() => {  
    fetchTransactions()
  }, [fetchTransactions])


  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}