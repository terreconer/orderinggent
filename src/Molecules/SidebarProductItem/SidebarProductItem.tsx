import { useDispatch } from "react-redux";
import { Product } from "../../types/types";
import { Button } from "../../Atoms";
import { addProductDetail } from "../../store/orderSlice";

interface IProductProps {
  product: Product;
  orderId: string;
}

export const SidebarProductItem = ({ product, orderId }: IProductProps) => {
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(addProductDetail({ orderId, product }));
  };

  return (
    <div key={product.id} className="flex items-center justify-between mb-3 mt-2 pt-2 pb-5 border-b-2">
      <div className="flex items-center justify-between w-full">
        <div className="p-2 text-left border-r-2 w-1/5">{product.id}</div>
        <div className="p-2 text-left border-r-2 w-1/2">{product.description}</div>
        <div className="p-2 text-left w-1/5">{parseFloat(product.price).toFixed(2)}</div>
      </div>
      <div className="p-1 h-full">
        <Button
          title="Add"
          onClickHandler={handleAddProduct}
          type="button"
          className="bg-lime-300 p-2"
        />
      </div>
    </div>
  );
};
