# Kullanıcı Not Alma Uygulaması (Sadece API)

Bu proje, kullanıcıların sisteme giriş yapabileceği, kayıt olabileceği, bilgilerini güncelleyebileceği ve notlarını ekleyebileceği bir kullanıcı sistemi ve not alma uygulaması ve kullanıcılar sadece API kısmını içermektedir ve ayrıca kullanıcılar ile ilgili işlemler için admin sistemini içermektedir.

kullanıcılar herhangi bir işlem yaptıgında her ne kadar basitte olsa yaptıkları işlem ile alakali bir log sistemi vardir.

Bu aşamada herhangi bir frontend kısmı bulunmamaktadır.

## Başlangıç

Aşağıdaki adımları izleyerek projeyi yerel makinenizde çalıştırabilirsiniz:

1. Bu projeyi kopyalamak için aşağıdaki komutu çalıştırın:
git clone https://github.com/melihAkn/noteApp

2. Proje klasörüne gidin:

cd .\noteApp\Backend\

3. Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

npm install

4. MongoDB veritabanını başlatın:

mongod

5. Projeyi başlatmak için aşağıdaki komutu çalıştırın:

npm start

6. API'ları test etmek için bir API geliştirme aracı (Postman, cURL vb.) kullanabilirsiniz.

## API Dökümantasyonu

Projenin API'ları JWT tabanlı kimlik doğrulama ile çalışır. Aşağıdaki API'lar mevcuttur:

- `POST http://localhost:3000/users/signup`: Yeni bir kullanıcı kaydı oluşturmak için kullanılır. İstenen parametreler: `name`, `surName`, `email`,`userName`,`password`.

- `POST http://localhost:3000/users/login`: Kullanıcı girişi yapmak için kullanılır. İstenen parametreler: `username` or `email`, `password`. Başarılı giriş sonrası, bir JWT token döner.

- `POST http://localhost:3000/users/addNote`: Mevcut kullanıcının profil bilgilerini getirir. Kimlik doğrulama için geçerli bir JWT token gereklidir.

- `GET http://localhost:3000/users/myNotes`: Mevcut kullanıcının sisteme eklediği notları getirmesini sağlar. Kimlik doğrulama için geçerli bir JWT token gereklidir.

- `PATCH http://localhost:3000/users/user`: Kullanıcının kendi bilgilerini guncellemesini sağlar. Kimlik doğrulama için geçerli bir JWT token gereklidir. 

------------------------------ADMİN İSLEMLERİ-------------------------------------
- `GET http://localhost:3000/admin`: admin ana sayfasına girildiğinde "hoşgeldiniz" degerini dondurur.

- `POST http://localhost:3000/admin/login`: admin girişi yapmak için kullanılır. İstenen parametreler: `username`, `password`. Başarılı giriş sonrası, bir JWT token döner.

- `POST http://localhost:3000/admin/register`: Yeni bir admin kaydı oluşturmak için kullanılır. İstenen parametreler: `userName`,`password`.

- `PATCH http://localhost:3000/admin/update`: adminin sistemdeki bilgilerini guncellemesi icin kullanılır.

  ADMİNİN KULLANICILAR İLE İLGİLİ YAPACAGI İŞLEMLER
- `GET http://localhost:3000/admin/getUsers`: adminin  tum lullanıcıları
  getirmesini sağlar. Kimlik doğrulama için geçerli bir JWT token gereklidir.


- `GET http://localhost:3000/admin/getUser`: adminin  kullanıcı adına gore kullanıcı getirmesini sağlar. Kimlik doğrulama için geçerli bir JWT token gereklidir. istenen parametreler : `userName`

- `DELETE http://localhost:3000/admin/deleteUser`: adminin  kullanıcı adına veya emaile gore kullanıcı silmesini sağlar. Kimlik doğrulama için geçerli bir JWT token gereklidir. istenen parametreler : `userName` or `email`

- `DELETE http://localhost:3000/admin/deleteUser`: adminin  kullanıcı adına veya emaile gore kullanıcı silmesini ve silinen kullanıcının notlarınıda silmesini sağlar. Kimlik doğrulama için geçerli bir JWT token gereklidir. istenen parametreler : `userName` or `email`

- `GET http://localhost:3000/admin/deleteAllUser`: adminin tum kullanıcıları ve kullanıcıların notlarınıda silmesini sağlar. Kimlik doğrulama için geçerli bir JWT token gereklidir. istenen parametreler.
API endpoint'lerine istek yaparken JSON formatında veri göndermelisiniz.

  Daha fazla detay için, projenin kaynak kodlarını inceleyebilirsiniz.

## Katkılar ve Lisans
Bu proje açık kaynaklıdır. Her türlü katkı ve öneriye açıktır.
