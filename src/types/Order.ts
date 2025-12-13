export interface Order {
  id: number;
  productId : number,
  product: string;    
  quantity: number;       
  totalPrice?: number; 
  customer: string;        
  date: string;        
  status: string;     
}
