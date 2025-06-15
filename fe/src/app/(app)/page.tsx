"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Accordion } from "@radix-ui/react-accordion";
import { ArrowRight, HandCoins, ShieldCheck, Sofa } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Tiện ích kèm theo
const utilities = [
  {
    icon: HandCoins,
    title: "Tiết kiệm chi phí",
    description: "Phù hợp với người mới đi làm, sinh viên, cặp vợ chồng trẻ.",
    color: "text-green-600",
  },
  {
    icon: ShieldCheck,
    title: "Bảo trì sửa chữa",
    description:
      "Bảo trì kịp thời, không có chi phí phát sinh bất ngờ khi sở hữu nhà.",
    color: "text-blue-600",
  },
  {
    icon: Sofa,
    title: "Nội thất tiện nghi",
    description:
      "Nội thất cơ bản đầy đủ, tiện dụng, tiện nghi tại chính tổ ấm của bạn.",
    color: "text-yellow-600",
  },
];

// Các căn hộ nổi bật
const apartments = [
  {
    src: "/modern-apartment-moscow-ariana-ahmad-design.jpg",
    title: "Phong cách hiện đại",
    description:
      "Căn hộ mang phong cách hiện đại đầy đủ nội thất tiện nghi, không gian sống xanh thư giãn.",
  },
  {
    src: "/AO11_ArielO.jpg",
    title: "Phong cách cổ điển",
    description:
      "Căn hộ mang phong cách cổ điển, hoài niệm, đầy đủ cơ sở vật chất.",
  },
  {
    src: "/Minimalist-apartment-ideas-by-Decorilla.jpeg",
    title: "Phong cách tối giản",
    description:
      "Căn hộ tối giản, sang trọng, tiện dụng, phù hợp nhu cầu đa dạng.",
  },
];

// Các tiện ích phòng
const roomFeatures = [
  {
    title: "Phòng ngủ",
    content: (
      <>
        <p className="text-gray-600">
          Phòng ngủ được thiết kế tối ưu cho sự thoải mái và riêng tư.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-500">
          <li>Trang bị sẵn máy lạnh, rèm cửa hai lớp cách nhiệt.</li>
          <li>Giường ngủ cao cấp, tủ quần áo âm tường rộng rãi.</li>
          <li>Cửa sổ lớn đón ánh sáng tự nhiên và thông gió tốt.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Phòng vệ sinh",
    content: (
      <>
        <p className="text-gray-600">
          Không gian phòng tắm hiện đại, tiện nghi.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-500">
          <li>Gạch lát chống trơn trượt, hệ thống thông gió tự động.</li>
          <li>Trang bị lavabo, gương lớn, vòi sen nóng lạnh.</li>
          <li>Một số căn hộ có cả bồn tắm hoặc vách kính tắm đứng.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Phòng bếp",
    content: (
      <>
        <p className="text-gray-600">
          Phòng bếp tiện nghi, đáp ứng đầy đủ nhu cầu nấu ăn hằng ngày.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-500">
          <li>Bếp từ hoặc bếp gas âm, hệ thống hút mùi mạnh.</li>
          <li>Tủ bếp gỗ công nghiệp chống ẩm, bồn rửa inox đôi.</li>
          <li>Không gian thoáng, tiện dụng, bố trí khoa học.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Ban công",
    content: (
      <>
        <p className="text-gray-600">
          Ban công rộng rãi - nơi thư giãn lý tưởng mỗi ngày.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-500">
          <li>Sàn chống trơn, có vòi nước phụ để giặt giũ.</li>
          <li>Lan can chắc chắn, an toàn, tầm nhìn thoáng.</li>
          <li>Một số căn còn bố trí sẵn móc treo quần áo hoặc bàn cafe.</li>
        </ul>
      </>
    ),
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Section 1: Giới thiệu */}
      <section className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl shadow-lg p-8 lg:p-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Khám phá căn hộ mơ ước cùng{" "}
            <span className="text-primary">Urbanvista</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nền tảng bất động sản hàng đầu với những căn hộ chất lượng cao, tiện
            nghi hoàn hảo, và không gian sống lý tưởng.
          </p>
          <Button
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-colors"
            onClick={() => router.push("/apartments")}
          >
            Khám phá ngay
          </Button>
        </div>
        <div className="flex-1">
          <Image
            src="/bcons-city-full-17.jpg"
            width={600}
            height={600}
            alt="Căn hộ Urbanvista"
            className="rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105 w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Section 2: Tiện ích kèm theo */}
      <section className="mt-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-10">
          Tiện ích nổi bật khi thuê căn hộ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {utilities.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <item.icon className={`w-14 h-14 ${item.color} mb-6`} />
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Các căn hộ nổi bật */}
      <section className="mt-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-10">
          Các căn hộ nổi bật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {item.description}
                </p>
                <Button className="mt-4 w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors">
                  Xem thêm
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Hỗ trợ dịch vụ */}
      <section className="mt-16 bg-primary/10 rounded-3xl p-8 lg:p-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
          Bạn cần hỗ trợ bảo trì hoặc sửa chữa căn hộ?
        </h2>
        <Button
          variant="default"
          className="px-8 py-3 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
          onClick={() => router.push("/support")}
        >
          Yêu cầu ngay
          <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
        </Button>
      </section>

      {/* Section 5: Các tiện nghi phòng */}
      <section className="mt-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-10">
          Tìm hiểu về tiện nghi căn hộ
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full bg-white rounded-2xl shadow-md"
        >
          {roomFeatures.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx + 1}`}>
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-foreground hover:bg-gray-50 transition-colors">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-sm text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
