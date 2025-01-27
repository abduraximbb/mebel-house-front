import shop_info1 from "@/assets/shop_info1.png";
import shop_info2 from "@/assets/shop_info2.png";
import shop_info3 from "@/assets/shop_info3.png";
import shop_info4 from "@/assets/shop_info4.png";

const ShopInfo = () => {
  return (
    <div className="bg-[#faf3ea] py-8 px-4">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center">
          <img src={shop_info1} alt="High Quality" className="w-12 h-12 mb-2" />
          <h4 className="text-lg font-semibold">High Quality</h4>
          <p className="text-sm text-gray-600">crafted from top materials</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={shop_info2}
            alt="Warranty Protection"
            className="w-12 h-12 mb-2"
          />
          <h4 className="text-lg font-semibold">Warranty Protection</h4>
          <p className="text-sm text-gray-600">Over 2 years</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={shop_info3}
            alt="Free Shipping"
            className="w-12 h-12 mb-2"
          />
          <h4 className="text-lg font-semibold">Free Shipping</h4>
          <p className="text-sm text-gray-600">Order over 150 $</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={shop_info4} alt="24/7 Support" className="w-12 h-12 mb-2" />
          <h4 className="text-lg font-semibold">24 / 7 Support</h4>
          <p className="text-sm text-gray-600">Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
