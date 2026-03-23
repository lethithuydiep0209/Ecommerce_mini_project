# Mini Shoppe - React + Vite

Ung dung Front-end e-commerce duoc xay dung bang React (Vite), mo phong Shopee theo huong Intern/Junior-ready:

- UI responsive voi Header, Footer va TailwindCSS
- Tach component/page/hook/service ro rang
- Lay du lieu tu API that (`fakestoreapi.com`)
- Search + filter theo text, category, gia
- Sort gia tang/giam + phan trang (pagination)
- React Router + trang chi tiet dung `useParams`
- Cart add/remove, tong so luong, tong gia, luu `localStorage`
- Favorites add/remove + luu `localStorage`
- Fake Login/Logout (localStorage)
- Checkout form (name/phone/address/note) co validate
- Custom hook `useFetch` + loading/error state
- Debounce search va skeleton loading cho UX muot hon
- Toast notification khi them vao gio
- Home banner carousel + overlay + CTA "Shop Now"
- Form validate input va hien thi message

## Cau truc thu muc

```text
src/
  components/
  pages/
  services/
  hooks/
  context/
  utils/
```

## Cai dat va chay

```bash
npm install
npm run dev
```

Mo trinh duyet tai: [http://localhost:5173](http://localhost:5173)

## Build production

```bash
npm run build
npm run preview
```

## API dang su dung

- Danh sach san pham: `https://fakestoreapi.com/products`
- Chi tiet san pham: `https://fakestoreapi.com/products/:id`

## Route chinh

- `/`: Home (banner + san pham noi bat)
- `/products`: Danh sach san pham (search/filter/sort/pagination)
- `/product/:productId`: Chi tiet san pham
- `/favorites`: Danh sach yeu thich
- `/cart`: Gio hang
- `/checkout`: Thanh toan
- `/contact`: Form lien he co validate

## Demo flow

Browse Home -> Search/Product list -> Product detail -> Add to cart -> Checkout

