export default function Tab({
  picture,
  name,
  value,
  unit,
  itemName,
}: {
  picture: string;
  name: string;
  value: number | string;
  unit: string;
  itemName: string;
}) {
  return (
    <div className="flex items-center justify-center w-1/2 h-full bg-[#FBFBFB] p-8 rounded-sm">
      <img src={picture} alt={name} className="w-16 h-16" />
      <div className="flex flex-col pl-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {value}
          {unit}
        </h2>
        <p className="text-gray-600">{itemName}</p>
      </div>
    </div>
  );
}
