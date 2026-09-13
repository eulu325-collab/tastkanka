import React from 'react';
import Accordion from './Accordion';

const FAQ_ITEMS = [
  {
    question: 'Görsel nasıl yüklenir?',
    answer:
      '"Görsel Yükle" sayfasına git, dosyanı sürükle-bırak ile ekle veya "Dosya Seç" butonuna tıkla. Yükleme tamamlandığında sana bir paylaşım linki verilir.',
  },
  {
    question: 'Hangi dosya formatları destekleniyor?',
    answer: 'JPG, JPEG, PNG, GIF ve WEBP formatlarındaki görselleri yükleyebilirsin.',
  },
  {
    question: 'Paylaşım linki ne kadar süre aktif?',
    answer:
      'Yükleme sırasında seçtiğin saklama süresine göre değişir: 1 gün, 7 gün, 30 gün, 90 gün veya süresiz.',
  },
  {
    question: 'Görselimi nasıl silebilirim?',
    answer:
      '"Görsellerim" sayfasından ilgili görselin üzerindeki "Sil" butonuna tıklayarak görselini kalıcı olarak kaldırabilirsin.',
  },
  {
    question: 'Şifre koruması nasıl çalışıyor?',
    answer:
      'Yükleme sırasında şifre korumasını aktif edip bir şifre belirlersen, paylaşım linkine giren kişiler görseli görmeden önce bu şifreyi girmek zorunda kalır.',
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold text-navy">Yardım</h1>
      <p className="mt-2 mb-8 text-sm text-slate-500">Sık sorulan sorulara buradan ulaşabilirsin.</p>
      <Accordion items={FAQ_ITEMS} />
    </div>
  );
}
