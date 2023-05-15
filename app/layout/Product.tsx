export default function Product(props) {
  let { item } = props;
  console.log(item);
  return (
    <div className="flex flex-col bg-gray-50 shadow p-2">
      <img src={item.image} alt="cloth" />
      <button type="button" className="text-black border-black-1">
        Shop {item.category}
      </button>
    </div>
  );
}
