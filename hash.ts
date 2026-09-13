/**
 * DEMO AMAÇLI basit bir hash fonksiyonu.
 * Gerçek bir üretim ortamında şifreler mutlaka backend tarafında
 * bcrypt/argon2 gibi güvenli bir algoritma ile hash'lenmelidir.
 * Bu fonksiyon yalnızca localStorage demo sisteminde şifrelerin
 * düz metin olarak tutulmamasını sağlamak içindir.
 */
export function demoHash(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `dh_${Math.abs(hash)}_${value.length}`;
}
