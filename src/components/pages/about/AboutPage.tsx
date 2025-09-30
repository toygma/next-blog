"use client";

import Image from "next/image";
import { GithubSvg, LinkedinSvg, YoutubeSvg } from "@/lib/svg";

const AboutPage = () => {
  return (
    <div className="mt-8">
      <div>
        <h1 className="text-4xl font-bold text-center mb-4">Hakkımda</h1>
        <p className="text-lg text-gray-600 text-center mb-8 dark:text-gray-200">
          Web siteme hoş geldiniz! Size en iyi içeriği ve kaynakları sağlamayı
          hedefliyorum.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto max-w-screen-xl px-4 py-4">
        <div>
          <p className="text-[16px] text-[#52525b] dark:text-gray-200">
            Teknolojiye olan yolculuğum, yalnızca bir meraktan ibaret değildi;
            internetin görünmez damarlarını, yani sistemlerin ruhunu anlamaya
            duyduğum derin bir arayıştı. Bu merak, beni iki büyük tutkuya
            sürükledi: bir yandan uygulamaları yaratmanın büyüleyici sanatı olan{" "}
            <strong>yazılım geliştirme</strong>, diğer yandan onları tehditlere
            karşı korumanın ince zekâ gerektiren bilimi olan{" "}
            <strong>siber güvenlik</strong>. Ben, bir uygulamanın yalnızca ne
            kadar çalıştığıyla değil, aynı zamanda{" "}
            <strong>ne kadar güvenli</strong> {" "}
            olduğuyla ilgilenen, iki cephede birden savaşan bir geliştiriciyim.
          </p>
          <br />

          <p className="text-[16px] text-[#52525b] dark:text-gray-200">
            Bugün, bu iki alanı harmanlayarak{" "}
            <strong>full-stack geliştirmenin</strong> en derin katmanlarına
            dalıyorum. Odak noktam:{" "}
            <strong>güvenliği merkeze alan modern mimariler</strong> inşa etmek.
            <strong>Next.js 15</strong> ve en güncel teknolojilerle, sadece
            işlevsel değil, aynı zamanda
            <strong> hızlı, zarif ve geleceğe hazır</strong> web uygulamaları
            geliştiriyorum. Projelerimde, kullanıcı deneyimini önceliklendiren
            temiz kod yapısı, yeniden kullanılabilir bileşenler ve performans
            optimizasyonunu bir araya getiriyorum. Modüler düzenim (Çalışmalar,
            Blog, Hakkımda) ise bu tutku ve disiplinin somut bir yansımasıdır.
          </p>
          <br />

          <p className="text-[16px] text-[#52525b] dark:text-gray-200">
            Klavyenin ötesinde, kendimi sürekli bir keşif ve öğrenme yolculuğuna
            adadım. Siber suçlarla mücadele alanındaki yenilikleri yakından
            takip ediyor,
            <strong> güvenli kodlama (Secure Coding)</strong> pratiklerini her
            gün uyguluyorum. Bulut altyapısı ve uygulama güvenliği bilgimi
            derinleştirerek, her satır kodun ardında daha büyük bir sorumluluk
            taşıdığına inanıyorum. Vizyonum; sadece uygulamalar inşa etmek
            değil, <strong>daha güvenilir, daha akıllı ve daha dirençli</strong>
            bir dijital ekosistem yaratmaya katkıda bulunmaktır.
          </p>
          <br />

          <p className="text-[16px] text-[#52525b] dark:text-gray-200">
            Teknoloji benim için bir araç değil, bir yolculuk; her satır kod bir
            adım, her proje bir macera. Amacım, sadece işlevsel ve güvenli
            uygulamalar geliştirmek değil, aynı zamanda insanlara ve dijital
            dünyaya değer katan deneyimler yaratmaktır. Bu yolculukta, her gün
            daha iyiye ulaşmak, daha akıllıca çözmek ve daha güvenli bir gelecek
            inşa etmek için çalışıyorum.
          </p>
        </div>

        <div className="md:ml-12">
          <div className="md:aspect-[12/9] w-full relative">
            <Image
              alt="Hakkımda Görseli"
              src="/images/toygma-min.png"
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-lg shadow-xl drop-shadow-2xl shadow-blue-500/40"
            />
          </div>
          <div className="mt-20 flex flex-col gap-3 md:items-start items-center">
            <p className="flex items-center gap-2 text-[16px] text-[#52525b] hover:bg-background cursor-pointer p-2 rounded-md group hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 dark:text-gray-200">
              <GithubSvg />
              <a
                href={"https://github.com/toygma"}
                rel="noopener noreferrer"
                target="_blank"
                className="group-hover:text-transparent"
                aria-label="Toygma'nın Github Profili"
              >
                {" "}
                GitHub'da Takip Et
              </a>
            </p>
            <p className="flex items-center gap-2 text-[16px] text-[#52525b] hover:bg-background cursor-pointer p-2 rounded-md group hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 dark:text-gray-200">
              <LinkedinSvg />
              <a
                href={"https://www.linkedin.com/in/toygma/"}
                rel="noopener noreferrer"
                target="_blank"
                className="group-hover:text-transparent"
                aria-label="Toygma'nın Linkedin Profili"
              >
                Linkedin'de Takip Et
              </a>
            </p>
            <p className="flex items-center gap-2 text-[16px] text-[#52525b] hover:bg-background cursor-pointer p-2 rounded-md group hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 dark:text-gray-200">
              <YoutubeSvg />
              <a
                href={"https://www.youtube.com/@toygma"}
                rel="noopener noreferrer"
                target="_blank"
                className="group-hover:text-transparent"
                aria-label="Toygma'nın Youtube Profili"
              >
                Youtube'da Takip Et
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
