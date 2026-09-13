import React from 'react';
import DocumentSection from './DocumentSection';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-navy">Gizlilik Politikası</h1>
      <p className="mb-10 text-sm text-slate-500">
        Verilerini nasıl topladığımızı, kullandığımızı ve koruduğumuzu bu sayfada açıklıyoruz.
      </p>

      <div className="flex flex-col gap-8">
        <DocumentSection title="Toplanan bilgiler">
          <p>
            Hesap oluşturduğunda kullanıcı adı ve e-posta adresin gibi temel bilgileri toplarız.
            Yüklediğin görseller ve bunlara ait meta veriler (dosya boyutu, yüklenme tarihi) de
            saklanır.
          </p>
        </DocumentSection>
        <DocumentSection title="Çerezler">
          <p>
            Oturumunu açık tutmak ve tercihlerini hatırlamak için gerekli minimum düzeyde çerez
            kullanırız.
          </p>
        </DocumentSection>
        <DocumentSection title="Görseller">
          <p>
            Yüklediğin görseller seçtiğin saklama süresi boyunca sunucularımızda tutulur. Süre
            dolduğunda görsel otomatik olarak silinir.
          </p>
        </DocumentSection>
        <DocumentSection title="Hesap bilgileri">
          <p>
            Şifren hiçbir zaman düz metin olarak saklanmaz; güvenli bir şekilde hash'lenerek
            tutulur.
          </p>
        </DocumentSection>
        <DocumentSection title="Veri güvenliği">
          <p>
            Verilerini korumak için makul teknik ve idari önlemler alırız. Yine de internet
            üzerinden hiçbir aktarımın %100 güvenli olmadığını unutma.
          </p>
        </DocumentSection>
        <DocumentSection title="Kullanıcı hakları">
          <p>
            Hesabını ve yüklediğin görselleri istediğin zaman silebilir, verilerinin bir kopyasını
            talep edebilirsin.
          </p>
        </DocumentSection>
      </div>
    </div>
  );
}
