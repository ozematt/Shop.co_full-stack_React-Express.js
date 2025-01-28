# Shop.co

Witam w moim projekcie **Shop.co**! Projekt powstał na podstawie darmowego layoutu z Figma: [E-commerce Website Template (Freebie)](https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie). Celem projektu jest przećwiczenie pracy z m.in. **TailwindCSS** i **TypeScript** jak również innymi narzędziami frontendowymi.

## Funkcjonalności

- **Responsywność**: Aplikacja dostosowuje się do różnych rozmiarów ekranu (mobile-first design).
- **Zarządzanie stanem**: Wykorzystanie **Redux ToolKit** do zarządzania globalnym stanem aplikacji.
- **Wykukiwarka produktów**: Użytkownicy mają do dyspozycji wyszukiwarkę produktów.
- **Katalog Produktów**:
  - Aplikacja wyświetla produkty wraz z ich zdjęciami, opisami, cenami i kategoriami.
  - Funkcje **filtrowania** oraz **sortowania** produktów (np. według ceny, kategorii).
- **Koszyk zakupowy** – Uzytkownicy mogą korzystać ze wszystkich funkcjonalności koszyka zakupowego.
- **Uwierzytelnianie użytkowników**: Po zalogowaniu, użytkownicy mogą dodawać produkty do koszyka i składać zamówienie.
- **Proces realizacji zakupów** – Użytkownicy przechodzą cały proces zakupu.
- **Panel uzytkownika** – Uzytkownik ma dostęp do informacji o swoim koncie, jak również do historii zakupów.
- **Obsługa motywów**: Użytkownik ma możliwość przełączania między **jasnym** a **ciemnym** motywem..

## Technologia

- **Vite**: nowoczesne narzędzie do budowy aplikacji frontendowych.
- **TailwindCSS**: nowoczesny framework CSS.
- **React** – JavaScriptowy framework do budowy interfejsów użytkownika.
- **TypeScript** – Superset JavaScriptu, który zapewnia statyczne typowanie, co poprawia niezawodność i stabilność aplikacji.
- **Material-UI (MUI)** – Framework CSS do stylizowania komponentów.
- **Zod**: biblioteka do walidacji danych.
- **React-Router** – Biblioteka do zarządzania trasami w aplikacji React.
- **TanStack Query** – Narzędzie do zarządzania stanem danych z API.
- **Redux Toolkit** – Biblioteka do globalnego zarządzania stanem aplikacji.
- **Docker** – Aplikacja jest budowana w kontenerze.
- **DummyJSON** – Zewnętrzne API, które dostarcza dane produktów, takie jak opisy, ceny, zdjęcia i kategorie (dokumentacja: [https://dummyjson.com/docs](https://dummyjson.com/docs)).
- **API REST** – Obsługa danych przez endpointy API.
- **Vitest** i **React Testing Library** – narzędzia do testów jednostkowych.

## Zrzuty ekranu

### Widok główny

![HomePage](./app/screenshots/HomePage.png)

### Widok główny - produkty

![ProductsView](./app/screenshots/ProductsView.png)

### Widok główny + produkty - Mobilny

![Mobile](./app/screenshots/Mobile.png)

### Koszyk zakupowy - pusty

![CartEmpty](./app/screenshots/CartEmpty.png)

### Koszyk zakupowy - pełny

![Cart](./app/screenshots/Cart.png)

### Koszyk zakupowy - Mobilny

![CartMobile](./app/screenshots/CartMobile.png)

## Funkcjonalności w trakcie przygotowania

- **Baza danych**: Historia zamówień bedzie zapisywana w bazie danych za pomocą Node.js (na tę chwile zamówienia są zapisywane w local storage).

Dziękuję za odwiedzenie repozytorium! 😊
