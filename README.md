# ResimLink

Modern bir görsel yükleme ve paylaşma platformu. React + TypeScript + React Router + Tailwind CSS ile inşa edilmiştir.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173/anasayfa` adresini aç.

Üretim derlemesi için:

```bash
npm run build
npm run preview
```

## Proje Yapısı

```
src/
  components/
    layout/     → Navbar, Footer
    ui/         → Button, TextField, Modal, Accordion, ToastStack (genel bileşenler)
    upload/     → Dropzone, yükleme kuyruğu ve sonuç kartı
    image/      → QR kod modalı, paylaş modalı, görsel kartı
    common/     → Logo, AuthGuard, DocumentSection
  layouts/      → MainLayout (navbar+footer), BareLayout (paylaşım sayfası için sade düzen)
  pages/        → Her route için bir sayfa bileşeni
  services/     → authService, imageService (localStorage tabanlı mock backend)
  hooks/        → useAuth, useToast, useClipboard
  utils/        → id üretimi, biçimlendirme, demo hash fonksiyonu
  types/        → Ortak TypeScript tipleri
  App.tsx       → Tüm route tanımları
  main.tsx      → Uygulama giriş noktası (BrowserRouter + provider'lar)
```

## Demo veri sistemi

Şu anda gerçek bir backend bulunmuyor. Kullanıcılar, oturum bilgisi ve yüklenen
görseller `localStorage` üzerinde saklanıyor (bkz. `src/services/authService.ts`
ve `src/services/imageService.ts`). Görseller `dataUrl` (base64) olarak tutulur.

Gerçek bir backend'e bağlanmak için sadece bu iki servis dosyasının içini
`fetch('/api/...')` çağrılarıyla değiştirmek yeterli — component'ler ve
hook'lar servislerin dışa açtığı fonksiyon imzalarına (Promise tabanlı)
bağlı olduğu için değişmesine gerek kalmaz.

Önemli notlar:
- Şifreler düz metin olarak saklanmaz; `src/utils/hash.ts` içindeki basit
  demo hash fonksiyonu ile hash'lenir. **Bu fonksiyon yalnızca demo
  amaçlıdır** — gerçek bir üretim ortamında şifreler backend tarafında
  bcrypt/argon2 gibi güvenli bir algoritma ile hash'lenmelidir.
- Görsel saklama süresi (`retention`) şu an yalnızca metadata olarak
  tutuluyor; otomatik silme işlemi gerçek bir backend'de bir cron/queue
  job'u ile yapılmalıdır.

## Route'lar

| Route | Açıklama | Erişim |
|---|---|---|
| `/anasayfa` | Ana sayfa | Herkes |
| `/giris` | Giriş | Herkes |
| `/kayit` | Kayıt | Herkes |
| `/sifremi-unuttum` | Şifre sıfırlama | Herkes |
| `/yukle` | Görsel yükleme | Herkes (görseller giriş yapılmışsa hesaba bağlanır) |
| `/gorsellerim` | Kullanıcının görselleri | Sadece giriş yapmış kullanıcı |
| `/profil` | Profil/dashboard | Sadece giriş yapmış kullanıcı |
| `/gorsel/:id` | Paylaşılabilir görsel sayfası | Herkes (şifre korumalıysa şifre gerekir) |
| `/kurallar`, `/gizlilik`, `/hakkimizda`, `/iletisim`, `/yardim` | Statik sayfalar | Herkes |
| `/404` | Bulunamadı sayfası | Herkes |

## Statik hosting için SPA yönlendirmesi

`react-router-dom`'un `BrowserRouter`'ı ile çalıştığı için, bir route'a
doğrudan girildiğinde veya sayfa yenilendiğinde sunucunun `index.html`
dosyasını döndürmesi gerekir. `npm run dev` ve `npm run preview` bunu
otomatik yapar. Netlify (`public/_redirects`) ve Vercel (`vercel.json`)
için gerekli yönlendirme dosyaları projeye eklenmiştir.
