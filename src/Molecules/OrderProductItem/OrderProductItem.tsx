import { memo } from "react";
import { useDispatch } from "react-redux";
import { addProductDetail, removeProductDetail } from "../../store/orderSlice";
import { Product } from "../../types/types";
import { Button } from "../../Atoms";
import './styles/productItem.css';

interface IProductProps {
  product: Product;
  orderId: string;
  quantity: string;
  total: string;
}

export const OrderProductItem = memo(({ orderId, product, quantity, total }: IProductProps) => {
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(addProductDetail({ orderId, product }));
  };

  const handleremoveProduct = () => {
    dispatch(removeProductDetail({ orderId, product }));
  };

  return (
    <div key={product.id} className="border-2 flex flex-col">
      <div className="productItem-item flex justify-between align-center border-b-2">
        <span className="p-2 text-left">Category: </span>
        <span className="p-2 text-left">{product.category}</span>
        </div>
      <div className="productItem-item flex justify-between align-center border-b-2">
        <span className="p-2 text-left">ID: </span>
        <span className="p-2 text-left">{product.id}</span>
        </div>
      <div className="productItem-item flex justify-between align-center border-b-2">
        <span className="p-2 text-left">Description: </span>
        <span className="p-2 text-left">{product.description}</span>
        </div>
      <div className="productItem-item flex justify-between align-center border-b-2">
        <span className="p-2 text-left">Price: </span>
        <span className="p-2 text-left">{product.price}</span>
        </div>
      <div className="productItem-item flex justify-between align-center border-b-2">
        <span className="p-2 text-left">Quantity: </span>
        <span className="p-2 text-left">{quantity}</span>
        </div>
      <div className="productItem-item flex justify-between align-center border-b-2">
        <span className="p-2 text-left">TOTAL PRICE</span>
        <span className="p-2 text-left">{total}</span>
        </div>
      <div className="flex flex-row justify-between items-center w-full mt-5">
        <Button
          title="Add"
          onClickHandler={handleAddProduct}
          type="button"
          className="w-1/2 bg-lime-300 p-2 text-center block"
        />
        <Button
          title="Remove"
          onClickHandler={handleremoveProduct}
          type="button"
          className="w-1/2 bg-red-700 p-2 text-center block"
        />
      </div>
    </div>
  );
});
