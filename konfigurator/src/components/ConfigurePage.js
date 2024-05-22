import React, { useState } from 'react';
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import styles from "../common/styles/ConfigurePage.module.scss";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from './Footer';

function ConfigurePage() {
  const { state } = useLocation();
  const loggedInUser = state?.loggedInUser;
  const [setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollPosition(0);
  };


  return (
    <div className={styles.Box}>
      <ResponsiveAppBar />
      <main >
        <div className={styles.MainContainer}>
          <div className={styles.maintext}>
            <h1 className={styles.mainHeading}>Witaj w Konfiguratorze Swojego komputera - PC</h1>
            <p className={styles.sectionParagraph}>
              Alternatywą dla kupowania gotowego zestawu PC jest samodzielne zbudowanie go od podstaw. Takie rozwiązanie ma sporo zalet, wśród których największą jest pełna kontrola nad doborem podzespołów i dopasowaniem ich do własnych potrzeb oraz budżetu, którym dysponujemy. W przyszłości można też łatwo modernizować nasz komputer, bez obawy o naruszenie gwarancji na cały zestaw. Każdy zakupiony przez nas komponent będzie mieć bowiem własną gwarancję. Samodzielne składanie komputera PC może wydawać się skomplikowane, ale w rzeczywistości każdy powinien sobie z tym zadaniem poradzić. Wszystkie podzespoły dostarczane są ze szczegółową instrukcją montażu, aby uniknąć wszelkich problemów. Aby maksymalnie ułatwić cały proces doboru sprzętu komputerowego stworzyliśmy Konfigurator Komputera PC, który krok po kroku pomoże Ci wybrać optymalne elementy zestawu, dbając, aby były ze sobą kompatybilne.Dołączając do tego uzasadnienie, dlaczego tak a nie ianczej. Jeśli wybrany przez Ciebie komponent okaże się niezgodny z pozostałymi, zostaną zaproponowane alternatywy o zbliżonych parametrach.
            </p>
            <div className={styles.additionalText}>
              Po skompletowaniu wszystkich podzespołów możesz również zdecydować się na usługę montażu, którą sprawnie i szybko wykonam. Do ciebie bedzie należał bowiem tylko odbiór gotowego komputera.
              Gotowy i przetestowany sprzęt zostanie wówczas dostarczony pod wskazany przez Ciebie adres. Istnieje również możliwośc odbioru komputera w siedziby firmy.
            </div>
            <div className={styles.section}>
              Budżet i przeznaczenie komputera
              zacząć powinniśmy od określenia, jaką kwotę jesteśmy w stanie przeznaczyć na zakup nowego komputera. Istotne jest także jego przeznaczenie. Inne parametry powinien mieć komputer do biura, a inne wydajny komputer dla graczy.
            </div>


            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>O Nas</h2>
              <p className={styles.sectionParagraph}>
                Jesteśmy pasjonatami nowoczesnych technologii i staskupiamy sie na tym by dostarczane jednostki komputerowe byly dopasowane i odpowiadały Twoim preferncjom.
              </p>
            </div>
            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Płyta Główna</h2>
              <div className={styles.sectionParagraph}>
                <p>
                  Wybór płyty głównej ma zasadnicze znaczenie dla konfiguracji komputera PC, ponieważ w dużej mierze zadecyduje o jego przyszłych możliwościach rozbudowy, a także o włączeniu innych komponentów. Można powiedzieć, że płyta główna jest kręgosłupem komputera i utrzymuje razem wszystkie elementy.
                  <p>
                    Płyta główna to centralny element komputera, na którym montowane są pozostałe podzespoły. Wybór odpowiedniej płyty zależy od rodzaju procesora, ilości slotów pamięci RAM i innych funkcji, takich jak obsługa karty graficznej czy liczba portów USB. Natomiast bez dobrej płytyt głównej nie bedzie w przyszlosci mozliwosci do rozbudowy komputera. Dlatgo zaczynamy od Kregosłupa.
                  </p>
                  <h4>
                    Znaczenie płyty głównej
                  </h4>
                  <p>
                    Płyta główna służy nie tylko do zakotwiczenia wszystkich składowych komputera. Wszystkie dane i połączenia innych komponentów, takich jak procesory, pamięć RAM lub dyski twarde, przechodzą przez płytę komputerową. Można powiedzieć, że jest to część komputera, która kontroluje całość danych. Im lepsza płyta główna, tym lepszy obieg danych.
                  </p>
                  Dodatkowo komputerowe płyty główne pozwalają na aktualizację komputera o nowe podzespoły. Musisz jednak wziąć pod uwagę, które części są z nimi kompatybilne, a które nie. Dlatego wybór jej jest sprawą najwyższej wagi i nie należy go lekceważyć. Kupując usługe złożenie komputera dostaniesz gwarancje kompatybilnośći podzespołów oraz możliwości przyszłej rozbudowy jednostki, która najlepiej odpowiada Twoim gustom i potrzebom. Złożona przez nas konifguracja posłuży Ci również na wiele lat.
                  <h4>
                    Płyty główne w formacie ATX
                  </h4>
                  Oferujemy płyty główne w formacie ATX. Mają standardowy rozmiar i są używane przez większość komputerów. Jest to płyta główna o uniwersalnym zastosowaniu, ponieważ może być używana zarówno do komputerów domowych, przeznaczonych do pracy, jak i do gier.
                  Format ATX płyty komputerowej sprawia, że idealnie nadaje się do montażu w każdym typie komputera. Ma kilka portów i wystarczającą liczbę gniazd do zamontowania dobrego urządzenia PC, a także idealny rozmiar do umieszczenia w zdecydowanej większości obudów komputerowych.
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Procesor</h2>
              <p className={styles.sectionParagraph}>
                Procesor pełni rolę mózgu komputera, odpowiadając za wykonywanie operacji. Wybór odpowiedniego procesora zależy od rodzaju zastosowań komputera - od prostych zadań biurowych po zaawansowane gry czy prace graficzne.
                <p>
                  Procesory komputerowe (ang. CPU - Central Processing Unit) to jeden z podstawowych elementów każdego zestawu. To właśnie one odpowiadają za wykonywanie większości obliczeń związanych z pracą komputera. Znaczna część działających współcześnie konstrukcji cechuje się wielordzeniową konstrukcją umożliwiającą wykonywanie wielu zadań jednocześnie. Wśród typowych operacji, jakie są wykonywane przez procesory komputerowe, wyróżnić można: kopiowanie danych, działania arytmetyczne, działania na bitach, skoki.
                  <p>
                    Procesory komputerowe - budowa
                    Na funkcjonalną strukturę każdego procesora składają się kilka podstawowych układów. Pierwszy z nich to rejestry wykorzystywane do wyników i danych poszczególnych obliczeń, Mogą występować w jednej z form — ogólnodostępnej lub też dedykowanej do konkretnego zadania. Innym elementem funkcjonalnym jest jednostka arytmetyczna, wykonująca poszczególne operacje obliczeniowe na przechowywanych danych. Procesory komputerowe zawierają w sobie także układ odpowiadający za sterowanie przebiegiem wykonywania uruchomionego programu. Najmniejszym, podstawowym elementem są jednak tranzystory blokujące i odblokowujące przepływ prądu.
                  </p>
                  <p>
                    Co wpływa na wydajność?
                    Nie zawsze należy sugerować się wyłącznie taktowaniem. Końcowa wydajność, jaką jest zdolny osiągnąć dany egzemplarz, jest uzależniona od kilku czynników takich, jak: architektura, szybkość zegara, wielkość pamięci cache. Co to jednak oznacza? Pierwszy wspomniany czynnik, czyli architektura definiuje sposób, w jaki dany model współpracuje z zainstalowaną pamięcią operacyjną, a także urządzeniami wejścia i wyjścia. To właśnie ona określa także sposób, w jaki kolejne zadania są rozdzielane pomiędzy funkcjonujące rdzenie. Procesory komputerowe posiadają również wspomnianą już pamięć cache, czy podręczną. Do tej pory została ona podzielona na 3 poziomy: L1, L2, L3. L1 jest praktycznie zintegrowana z rdzeniem procesor podobnie jak L2, co nie od początku było jednak oczywiste. Poziom 3 jest natomiast najczęściej wykorzystywany w rozwiązaniach serwerowych, umożliwiając zmaksymalizowanie dokładności przesyłanych danych.
                  </p>
                </p>
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Pamięć RAM</h2>
              <p className={styles.sectionParagraph}>
                Pamięć RAM wpływa na ogólną wydajność systemu, umożliwiając równoczesne wykonywanie wielu zadań. Ważne jest dostosowanie ilości i szybkości pamięci RAM do potrzeb użytkownika i wymagań programów.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Chłodzenie procesora</h2>
              <p className={styles.sectionParagraph}>
                Chłodzenie procesora jest istotne dla utrzymania odpowiedniej temperatury podczas intensywnego użytkowania. Istnieje wiele rodzajów chłodzeń, w tym powietrzne i ciekłe, a wybór zależy od mocy procesora i preferencji użytkownika.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Karta graficzna</h2>
              <p className={styles.sectionParagraph}>
                Karta graficzna odpowiada za renderowanie grafiki. Dla graczy i profesjonalistów graficznych ważne jest wybranie karty o odpowiedniej mocy obliczeniowej, obsługującej najnowsze technologie graficzne.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Dysk twardy</h2>
              <p className={styles.sectionParagraph}>
                Dysk twardy przechowuje system operacyjny, programy i dane. Dobór odpowiedniego dysku zależy od potrzeb użytkownika, a SSD może znacznie przyspieszyć czas ładowania systemu i programów.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Zasilacz</h2>
              <p className={styles.sectionParagraph}>
                Zasilacz dostarcza energię do wszystkich komponentów komputera. Ważne jest, aby jego moc była wystarczająca dla wszystkich podzespołów, a także zwrócenie uwagi na efektywność energetyczną.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionHeading}>Obudowa</h2>
              <p className={styles.sectionParagraph}>
                Obudowa nie tylko chroni podzespoły, ale także wpływa na wentylację i estetykę. Wybór zależy od preferencji użytkownika, liczby dostępnych miejsc na chłodzenie oraz wielkości planowanego zestawu.
              </p>
            </div>


            <form className={styles.mainPageWrapper} >
              <Box sx={{ m: 2 }}>
                <Link to={`/configurator?user=${loggedInUser}`}>
                  <Button variant="contained">
                    Skonfiguruj
                  </Button>
                </Link>
              </Box>
            </form>
            <div className={styles.contactSection}>
              <h2 className={styles.sectionHeading}>Kontakt</h2>
              <p className={styles.sectionParagraph}>
                Skontaktuj się z nami pod adresem email: jan.goralewski@o2.pl
              </p>
            </div>
          </div>
        </div>
        <div>
          <div id="contactSection">
            <Footer />
          </div>
        </div>
      </main >
    </div>
  );
}

export default ConfigurePage;
