import React from 'react';
import DocumentSection from './DocumentSection';

export default function RulesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-navy">Kullanım Kuralları</h1>
      <p className="mb-10 text-sm text-slate-500">
        ResimLink'i kullanırken uyman gereken temel kurallar aşağıda listelenmiştir.
      </p>

      <div className="flex flex-col gap-8">
        <DocumentSection title="Yasaklı içerikler">
          <p>
            Yasa dışı, şiddet içeren, nefret söylemi barındıran veya reşit olmayanları istismar eden
            görseller yüklenemez. Bu kurala aykırı içerikler tespit edildiğinde derhal kaldırılır.
          </p>
        </DocumentSection>
        <DocumentSection title="Telif hakkı">
          <p>
            Sadece kendine ait olan veya paylaşma hakkına sahip olduğun görselleri yükleyebilirsin.
            Telif hakkı ihlali bildirimleri incelenir ve gerekli görüldüğünde içerik kaldırılır.
          </p>
        </DocumentSection>
        <DocumentSection title="Kötüye kullanım">
          <p>
            Platformu başka kullanıcılara zarar vermek, kötü amaçlı yazılım dağıtmak veya kimlik
            avı içerikleri barındırmak için kullanmak kesinlikle yasaktır.
          </p>
        </DocumentSection>
        <DocumentSection title="Spam">
          <p>
            Otomatik araçlarla toplu görsel yükleme veya sistemi aşırı yüklemeye yönelik davranışlar
            hesabının askıya alınmasına neden olabilir.
          </p>
        </DocumentSection>
        <DocumentSection title="Hesap güvenliği">
          <p>
            Hesabının güvenliğinden sen sorumlusun. Şifreni kimseyle paylaşma ve şüpheli bir durumla
            karşılaşırsan bizimle iletişime geç.
          </p>
        </DocumentSection>
        <DocumentSection title="İçerik kaldırma">
          <p>
            Kurallara aykırı bulduğumuz içerikleri önceden haber vermeksizin kaldırma hakkımızı saklı
            tutarız.
          </p>
        </DocumentSection>
      </div>
    </div>
  );
}
