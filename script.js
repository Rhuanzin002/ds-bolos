/* =========================================================
   D.S. BOLOS
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURAÇÕES
    ===================================================== */

    /*
        IMPORTANTE:
        Troque pelo WhatsApp da D.S. Bolos.

        Formato:
        55 + DDD + número

        Exemplo:
        5582999999999
    */

    const WHATSAPP_NUMBER = "558287093217";


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuButton && mobileNav) {

        menuButton.addEventListener("click", () => {

            menuButton.classList.toggle("active");
            mobileNav.classList.toggle("active");

        });


        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuButton.classList.remove("active");
                mobileNav.classList.remove("active");

            });

        });

    }


    /* =====================================================
       GALERIA
    ===================================================== */

    const gallery = document.querySelector(".gallery-grid");

    /*
        Nossas gloriosas 30 imagens domesticadas.
        Se os arquivos estão em:

        assets/bolo-01.jpeg
        assets/bolo-02.jpeg
        ...
        assets/bolo-30.jpeg

        então NÃO PRECISA ALTERAR NADA.
    */

    const cakeImages = Array.from(
        { length: 30 },
        (_, index) => {

            const number = String(index + 1).padStart(2, "0");

            return {
                src: `assets/bolo-${number}.jpeg`,
                alt: `Bolo personalizado D.S. Bolos ${index + 1}`,
                category: "bolos"
            };

        }
    );


    /*
        Se depois você quiser categorizar cada foto,
        podemos trocar a lista automática acima por algo assim:

        {
            src: "assets/bolo-01.jpeg",
            alt: "Bolo infantil personalizado",
            category: "infantil"
        }

        {
            src: "assets/bolo-02.jpeg",
            alt: "Bolo de casamento",
            category: "casamento"
        }

        etc.
    */


    let visibleImages = 12;

    const imagesPerLoad = 6;


    function createGallery() {

        if (!gallery) return;

        gallery.innerHTML = "";

        const imagesToShow = cakeImages.slice(0, visibleImages);


        imagesToShow.forEach((cake, index) => {

            const item = document.createElement("button");

            item.className = "gallery-item";

            item.type = "button";

            item.dataset.index = index;
            item.dataset.category = cake.category;


            const image = document.createElement("img");

            image.src = cake.src;
            image.alt = cake.alt;

            image.loading = "lazy";

            item.appendChild(image);


            item.addEventListener("click", () => {

                openLightbox(index);

            });


            gallery.appendChild(item);

        });


        updateLoadMoreButton();

    }


    /* =====================================================
       VER MAIS
    ===================================================== */

    const loadMoreButton =
        document.querySelector("#load-more") ||
        document.querySelector(".gallery-more .button");


    function updateLoadMoreButton() {

        if (!loadMoreButton) return;


        if (visibleImages >= cakeImages.length) {

            loadMoreButton.style.display = "none";

        } else {

            loadMoreButton.style.display = "inline-flex";

        }

    }


    if (loadMoreButton) {

        loadMoreButton.addEventListener("click", () => {

            visibleImages += imagesPerLoad;

            createGallery();

        });

    }


    /* =====================================================
       FILTROS DA GALERIA
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-button");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            button.classList.add("active");


            const filter =
                button.dataset.filter || "all";


            const galleryItems =
                document.querySelectorAll(".gallery-item");


            galleryItems.forEach(item => {

                const category =
                    item.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        document.querySelector(".lightbox");

    const lightboxImage =
        document.querySelector(".lightbox-content img");

    const lightboxCaption =
        document.querySelector(".lightbox-content figcaption");

    const lightboxClose =
        document.querySelector(".lightbox-close");

    const lightboxPrevious =
        document.querySelector(".lightbox-previous");

    const lightboxNext =
        document.querySelector(".lightbox-next");


    let currentImageIndex = 0;


    function openLightbox(index) {

        if (!lightbox || !lightboxImage) return;


        currentImageIndex = index;


        const cake =
            cakeImages[currentImageIndex];


        lightboxImage.src = cake.src;
        lightboxImage.alt = cake.alt;


        if (lightboxCaption) {

            lightboxCaption.textContent =
                cake.alt;

        }


        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    }


    function closeLightbox() {

        if (!lightbox) return;


        lightbox.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    function showPreviousImage() {

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex =
                cakeImages.length - 1;

        }


        openLightbox(currentImageIndex);

    }


    function showNextImage() {

        currentImageIndex++;

        if (
            currentImageIndex >=
            cakeImages.length
        ) {

            currentImageIndex = 0;

        }


        openLightbox(currentImageIndex);

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrevious) {

        lightboxPrevious.addEventListener(
            "click",
            showPreviousImage
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextImage
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                showPreviousImage();

            }


            if (event.key === "ArrowRight") {

                showNextImage();

            }

        }
    );


    /* =====================================================
       ANIMAÇÕES AO ROLAR
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target
                                .classList
                                .add("visible");


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


       /* =====================================================
       CARDÁPIO + CARRINHO
    ===================================================== */

    const WHATSAPP_BUSINESS_NUMBER = "5582987093217";

    const categoryButtons =
        document.querySelectorAll(".product-category");

    const productPanels =
        document.querySelectorAll(".product-panel");

    const cartItemsElement =
        document.querySelector("#cartItems");

    const cartTotal =
        document.querySelector("#cartTotal");

    const cartTotalValue =
        document.querySelector("#cartTotalValue");

    const sendOrderButton =
        document.querySelector("#sendOrder");

    const whatsappDirect =
        document.querySelector("#whatsappDirect");

    const customerName =
        document.querySelector("#nome");

    const eventDate =
        document.querySelector("#data");

    const occasion =
        document.querySelector("#ocasiao");

    const observations =
        document.querySelector("#detalhes");

    let cart = [];


    /* =====================================================
       TROCA DE CATEGORIA
    ===================================================== */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;


            categoryButtons.forEach(item => {
                item.classList.remove("active");
            });


            productPanels.forEach(panel => {
                panel.classList.remove("active");
            });


            button.classList.add("active");


            const targetPanel =
                document.querySelector(
                    `[data-panel="${category}"]`
                );


            if (targetPanel) {
                targetPanel.classList.add("active");
            }

        });

    });


    /* =====================================================
       MÁXIMO DE 2 RECHEIOS
    ===================================================== */

    const fillingCheckboxes =
        document.querySelectorAll(
            'input[name="bolo-recheio"]'
        );


    function updateFillingLimit() {

        const selected =
            document.querySelectorAll(
                'input[name="bolo-recheio"]:checked'
            );


        fillingCheckboxes.forEach(checkbox => {

            checkbox.disabled =
                selected.length >= 2 &&
                !checkbox.checked;

        });

    }


    fillingCheckboxes.forEach(checkbox => {

        checkbox.addEventListener(
            "change",
            updateFillingLimit
        );

    });


    /* =====================================================
       FUNÇÕES AUXILIARES
    ===================================================== */

    function getCheckedValue(name) {

        return document.querySelector(
            `input[name="${name}"]:checked`
        );

    }


    function getCheckedValues(name) {

        return Array.from(
            document.querySelectorAll(
                `input[name="${name}"]:checked`
            )
        ).map(input => input.value);

    }


    function formatMoney(value) {

        return new Intl.NumberFormat(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        ).format(value);

    }


    function formatDate(dateString) {

        if (!dateString) return "";

        const parts =
            dateString.split("-");


        if (parts.length !== 3) {
            return dateString;
        }


        const [year, month, day] =
            parts;


        return `${day}/${month}/${year}`;

    }


    function escapeHTML(value) {

        return String(value)

            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function showOrderMessage(message) {

        /*
            Pequeno aviso sem precisar de biblioteca externa.
        */

        const oldMessage =
            document.querySelector(
                ".order-toast"
            );


        if (oldMessage) {
            oldMessage.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            "order-toast";


        toast.textContent =
            message;


        toast.style.position =
            "fixed";

        toast.style.left =
            "50%";

        toast.style.bottom =
            "28px";

        toast.style.transform =
            "translate(-50%, 15px)";

        toast.style.padding =
            "13px 18px";

        toast.style.borderRadius =
            "999px";

        toast.style.background =
            "#551923";

        toast.style.color =
            "#ffffff";

        toast.style.fontSize =
            "0.84rem";

        toast.style.fontWeight =
            "700";

        toast.style.zIndex =
            "99999";

        toast.style.boxShadow =
            "0 15px 40px rgba(0,0,0,.18)";

        toast.style.opacity =
            "0";

        toast.style.transition =
            "300ms ease";


        document.body.appendChild(toast);


        requestAnimationFrame(() => {

            toast.style.opacity =
                "1";

            toast.style.transform =
                "translate(-50%, 0)";

        });


        setTimeout(() => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translate(-50%, 15px)";


            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 2200);

    }


    /* =====================================================
       ADICIONAR BOLO
    ===================================================== */

    const addCakeButton =
        document.querySelector("#addCake");


    if (addCakeButton) {

        addCakeButton.addEventListener(
            "click",
            () => {

                const size =
                    getCheckedValue(
                        "bolo-tamanho"
                    );

                const dough =
                    getCheckedValue(
                        "bolo-massa"
                    );

                const fillings =
                    getCheckedValues(
                        "bolo-recheio"
                    );

                const theme =
                    document
                        .querySelector("#boloTema")
                        ?.value
                        .trim();


                if (!size) {

                    showOrderMessage(
                        "Escolha o tamanho do bolo 🎂"
                    );

                    return;

                }


                if (!dough) {

                    showOrderMessage(
                        "Escolha a massa do bolo 🍰"
                    );

                    return;

                }


                if (
                    fillings.length < 1 ||
                    fillings.length > 2
                ) {

                    showOrderMessage(
                        "Escolha 1 ou 2 recheios 🍫"
                    );

                    return;

                }


                const price =
                    Number(
                        size.dataset.price
                    );


                cart.push({

                    id: crypto.randomUUID(),

                    type: "Bolo",

                    title:
                        size.dataset.name,

                    subtitle:
                        size.dataset.serves,

                    price,

                    priceKnown: true,

                    details: [

                        `Massa: ${dough.value}`,

                        `Recheio${
                            fillings.length > 1
                                ? "s"
                                : ""
                        }: ${fillings.join(" + ")}`,

                        theme
                            ? `Tema/decoração: ${theme}`
                            : ""

                    ].filter(Boolean)

                });


                renderCart();


                showOrderMessage(
                    "Bolo adicionado ao pedido 🎂"
                );

            }
        );

    }


    /* =====================================================
       ADICIONAR DOCES
    ===================================================== */

    const addSweetsButton =
        document.querySelector("#addSweets");


    if (addSweetsButton) {

        addSweetsButton.addEventListener(
            "click",
            () => {

                const sweets =
                    getCheckedValues("doce");


                const quantity =
                    Number(
                        document
                            .querySelector(
                                "#docesQuantidade"
                            )
                            ?.value
                    );


                if (!sweets.length) {

                    showOrderMessage(
                        "Escolha pelo menos um doce 🍬"
                    );

                    return;

                }


                if (
                    !quantity ||
                    quantity < 50
                ) {

                    showOrderMessage(
                        "O pedido mínimo é de 50 doces."
                    );

                    return;

                }


                /*
                    O catálogo informa:
                    R$100 por 100 unidades
                    e mínimo de 50.

                    Como não temos preço explícito
                    para 50 unidades, só calculamos
                    automaticamente múltiplos de 100.
                */

                const priceKnown =
                    quantity % 100 === 0;


                const price =
                    priceKnown
                        ? (quantity / 100) * 100
                        : null;


                cart.push({

                    id: crypto.randomUUID(),

                    type: "Doces",

                    title:
                        `${quantity} doces`,

                    subtitle:
                        sweets.join(", "),

                    price,

                    priceKnown,

                    details: [
                        `Sabores: ${sweets.join(", ")}`
                    ]

                });


                renderCart();


                showOrderMessage(
                    "Doces adicionados ao pedido 🍬"
                );

            }
        );

    }


    /* =====================================================
       ADICIONAR SALGADOS FRITOS
    ===================================================== */

    const addFriedSnacksButton =
        document.querySelector(
            "#addFriedSnacks"
        );


    if (addFriedSnacksButton) {

        addFriedSnacksButton.addEventListener(
            "click",
            () => {

                const snacks =
                    getCheckedValues(
                        "salgado-frito"
                    );


                const quantity =
                    Number(
                        document
                            .querySelector(
                                "#fritosQuantidade"
                            )
                            ?.value
                    );


                if (!snacks.length) {

                    showOrderMessage(
                        "Escolha pelo menos um salgado."
                    );

                    return;

                }


                if (!quantity || quantity < 1) {

                    showOrderMessage(
                        "Informe a quantidade."
                    );

                    return;

                }


                /*
                    O catálogo só fornece
                    valor para 100 unidades.
                */

                const priceKnown =
                    quantity % 100 === 0;


                const price =
                    priceKnown
                        ? (quantity / 100) * 60
                        : null;


                cart.push({

                    id: crypto.randomUUID(),

                    type:
                        "Salgados fritos",

                    title:
                        `${quantity} salgados fritos`,

                    subtitle:
                        snacks.join(", "),

                    price,

                    priceKnown,

                    details: [
                        `Tipos: ${snacks.join(", ")}`
                    ]

                });


                renderCart();


                showOrderMessage(
                    "Salgados adicionados 🥟"
                );

            }
        );

    }


    /* =====================================================
       ADICIONAR SALGADOS DE FORNO
    ===================================================== */

    const addBakedSnacksButton =
        document.querySelector(
            "#addBakedSnacks"
        );


    if (addBakedSnacksButton) {

        addBakedSnacksButton.addEventListener(
            "click",
            () => {

                const snacks =
                    getCheckedValues(
                        "salgado-forno"
                    );


                const quantity =
                    Number(
                        document
                            .querySelector(
                                "#fornoQuantidade"
                            )
                            ?.value
                    );


                if (!snacks.length) {

                    showOrderMessage(
                        "Escolha pelo menos um salgado."
                    );

                    return;

                }


                if (!quantity || quantity < 1) {

                    showOrderMessage(
                        "Informe a quantidade."
                    );

                    return;

                }


                const priceKnown =
                    quantity % 100 === 0;


                const price =
                    priceKnown
                        ? (quantity / 100) * 75
                        : null;


                cart.push({

                    id: crypto.randomUUID(),

                    type:
                        "Salgados de forno",

                    title:
                        `${quantity} salgados de forno`,

                    subtitle:
                        snacks.join(", "),

                    price,

                    priceKnown,

                    details: [
                        `Tipos: ${snacks.join(", ")}`
                    ]

                });


                renderCart();


                showOrderMessage(
                    "Salgados adicionados 🥟"
                );

            }
        );

    }


    /* =====================================================
       ADICIONAR KIT FESTA
    ===================================================== */

    const addKitButton =
        document.querySelector("#addKit");


    if (addKitButton) {

        addKitButton.addEventListener(
            "click",
            () => {

                const kit =
                    getCheckedValue("kit");


                if (!kit) {

                    showOrderMessage(
                        "Escolha um Kit Festa 🎉"
                    );

                    return;

                }


                const price =
                    Number(
                        kit.dataset.price
                    );


                const cardPrice =
                    Number(
                        kit.dataset.cardPrice
                    );


                const card =
                    kit.closest(".kit-card");


                const people =
                    card
                        ?.querySelector(
                            ".kit-header strong"
                        )
                        ?.textContent
                        .trim() || "";


                const contents =
                    Array.from(
                        card?.querySelectorAll(
                            "li"
                        ) || []
                    ).map(item =>
                        item.textContent.trim()
                    );


                cart.push({

                    id: crypto.randomUUID(),

                    type:
                        "Kit Festa",

                    title:
                        kit.dataset.name,

                    subtitle:
                        people,

                    /*
                        Usamos o valor à vista
                        no subtotal conhecido.
                        O valor do cartão aparece
                        separadamente nos detalhes.
                    */

                    price,

                    priceKnown: true,

                    details: [

                        ...contents,

                        `Valor à vista: ${formatMoney(price)}`,

                        `Valor no cartão: ${formatMoney(cardPrice)}`

                    ],

                    cardPrice

                });


                renderCart();


                showOrderMessage(
                    "Kit Festa adicionado 🎉"
                );

            }
        );

    }


    /* =====================================================
       ADICIONAR TORTA
    ===================================================== */

    const addPieButton =
        document.querySelector("#addPie");


    if (addPieButton) {

        addPieButton.addEventListener(
            "click",
            () => {

                const size =
                    getCheckedValue(
                        "torta-tamanho"
                    );


                const flavor =
                    getCheckedValue(
                        "torta-sabor"
                    );


                if (!size) {

                    showOrderMessage(
                        "Escolha o tamanho da torta 🍰"
                    );

                    return;

                }


                if (!flavor) {

                    showOrderMessage(
                        "Escolha o sabor da torta."
                    );

                    return;

                }


                const price =
                    Number(
                        size.dataset.price
                    );


                cart.push({

                    id: crypto.randomUUID(),

                    type: "Torta",

                    title:
                        size.dataset.name,

                    subtitle:
                        size.dataset.serves,

                    price,

                    priceKnown: true,

                    details: [
                        `Sabor: ${flavor.value}`
                    ]

                });


                renderCart();


                showOrderMessage(
                    "Torta adicionada 🍰"
                );

            }
        );

    }


    /* =====================================================
       RENDERIZAR CARRINHO
    ===================================================== */

    function renderCart() {

        if (!cartItemsElement) return;


        if (!cart.length) {

            cartItemsElement.innerHTML = `

                <div class="summary-placeholder">

                    <span>🛒</span>

                    <p>
                        Seu carrinho ainda está vazio.
                        Adicione algum item para começar.
                    </p>

                </div>

            `;


            if (cartTotal) {
                cartTotal.hidden = true;
            }


            if (sendOrderButton) {
                sendOrderButton.disabled = true;
            }


            return;

        }


        cartItemsElement.innerHTML =
            cart.map(item => {

                const priceText =
                    item.priceKnown
                        ? formatMoney(item.price)
                        : "A confirmar";


                const detailsHTML =
                    item.details
                        .map(detail =>
                            `<span>${escapeHTML(detail)}</span>`
                        )
                        .join("");


                return `

                    <article class="cart-item">

                        <div class="cart-item-header">

                            <div class="cart-item-title">

                                <strong>
                                    ${escapeHTML(item.title)}
                                </strong>

                                ${
                                    item.subtitle
                                        ? `
                                        <small>
                                            ${escapeHTML(item.subtitle)}
                                        </small>
                                        `
                                        : ""
                                }

                            </div>


                            <span class="cart-item-price">
                                ${escapeHTML(priceText)}
                            </span>

                        </div>


                        <div class="cart-item-details">
                            ${detailsHTML}
                        </div>


                        <button
                            type="button"
                            class="cart-remove"
                            data-remove-item="${item.id}"
                        >
                            Remover
                        </button>

                    </article>

                `;

            }).join("");


        const knownTotal =
            cart.reduce(
                (total, item) => {

                    if (
                        !item.priceKnown ||
                        item.price === null
                    ) {

                        return total;

                    }


                    return total + item.price;

                },

                0
            );


        const hasUnknownPrice =
            cart.some(
                item =>
                    !item.priceKnown ||
                    item.price === null
            );


        if (cartTotal) {
            cartTotal.hidden = false;
        }


        if (cartTotalValue) {

            cartTotalValue.textContent =
                hasUnknownPrice

                    ? `${formatMoney(knownTotal)} + itens a confirmar`

                    : formatMoney(knownTotal);

        }


        if (sendOrderButton) {
            sendOrderButton.disabled = false;
        }


        document
            .querySelectorAll(
                "[data-remove-item]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        removeCartItem(
                            button.dataset.removeItem
                        );

                    }
                );

            });

    }


    /* =====================================================
       REMOVER DO CARRINHO
    ===================================================== */

    function removeCartItem(id) {

        cart =
            cart.filter(
                item => item.id !== id
            );


        renderCart();

    }


    /* =====================================================
       MENSAGEM DO WHATSAPP
    ===================================================== */

    function buildWhatsAppMessage() {

        const name =
            customerName
                ?.value
                .trim() || "";

        const date =
            formatDate(
                eventDate?.value || ""
            );

        const eventOccasion =
            occasion
                ?.value
                .trim() || "";

        const details =
            observations
                ?.value
                .trim() || "";


        const lines = [

            "Olá! Vim pelo site da D.S. Bolos e gostaria de fazer uma encomenda. 🎂",

            "",

            "*DADOS DA ENCOMENDA*"

        ];


        if (name) {
            lines.push(
                `Nome: ${name}`
            );
        }


        if (date) {
            lines.push(
                `Data do evento: ${date}`
            );
        }


        if (eventOccasion) {
            lines.push(
                `Ocasião: ${eventOccasion}`
            );
        }


        lines.push(
            "",
            "*ITENS DO PEDIDO*"
        );


        cart.forEach(
            (item, index) => {

                lines.push(
                    "",
                    `*${index + 1}. ${item.title}*`
                );


                if (item.subtitle) {

                    lines.push(
                        item.subtitle
                    );

                }


                item.details.forEach(
                    detail => {

                        lines.push(
                            `• ${detail}`
                        );

                    }
                );


                if (item.priceKnown) {

                    lines.push(
                        `Valor: ${formatMoney(item.price)}`
                    );

                } else {

                    lines.push(
                        "Valor: a confirmar"
                    );

                }

            }
        );


        const knownTotal =
            cart.reduce(
                (total, item) => {

                    return (
                        item.priceKnown &&
                        item.price !== null
                    )
                        ? total + item.price
                        : total;

                },

                0
            );


        const hasUnknownPrice =
            cart.some(
                item =>
                    !item.priceKnown ||
                    item.price === null
            );


        lines.push(
            "",
            "*VALOR ESTIMADO*"
        );


        if (hasUnknownPrice) {

            lines.push(
                `${formatMoney(knownTotal)} + itens com valor a confirmar`
            );

        } else {

            lines.push(
                formatMoney(knownTotal)
            );

        }


        if (details) {

            lines.push(
                "",
                "*OBSERVAÇÕES*",
                details
            );

        }


        lines.push(
            "",
            "🖼️ Se necessário, enviarei as referências visuais da decoração por aqui.",
            "",
            "Gostaria de confirmar a disponibilidade, os detalhes e o valor final."
        );


        return lines.join("\n");

    }


    /* =====================================================
       ENVIAR PEDIDO
    ===================================================== */

    if (sendOrderButton) {

        sendOrderButton.addEventListener(
            "click",
            () => {

                if (!cart.length) {

                    showOrderMessage(
                        "Adicione algum item ao pedido."
                    );

                    return;

                }


                if (
                    !customerName ||
                    !customerName.value.trim()
                ) {

                    showOrderMessage(
                        "Informe seu nome antes de continuar."
                    );


                    customerName?.focus();

                    return;

                }


                const message =
                    buildWhatsAppMessage();


                const url =
                    `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       WHATSAPP DIRETO
    ===================================================== */

    if (whatsappDirect) {

        whatsappDirect.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const message =
                    "Olá! Vim pelo site da D.S. Bolos e gostaria de mais informações. 🎂";


                const url =
                    `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /*
        Mantemos também compatibilidade
        com todos os links antigos que usam
        data-whatsapp.
    */

    const whatsappLinks =
        document.querySelectorAll(
            "[data-whatsapp]"
        );


    whatsappLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const customMessage =
                    link.dataset.message ||
                    "Olá! Vim pelo site da D.S. Bolos e gostaria de mais informações. 🎂";


                const url =
                    `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(customMessage)}`;


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    });


    /* =====================================================
       DATA MÍNIMA
    ===================================================== */

    if (eventDate) {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        eventDate.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       INICIALIZAÇÃO DO CARRINHO
    ===================================================== */

    updateFillingLimit();

    renderCart();


    /* =====================================================
       SCROLL SUAVE PARA LINKS INTERNOS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        });


    /* =====================================================
       DATA MÍNIMA DO PEDIDO
    ===================================================== */

    if (eventDate) {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        eventDate.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       FALLBACK DE IMAGEM
    ===================================================== */

    document.addEventListener(
        "error",
        event => {

            const target =
                event.target;


            if (
                target.tagName !== "IMG"
            ) {

                return;

            }


            /*
                Não deixamos entrar num loop infinito
                caso até o fallback dê errado.
            */

            if (
                target.dataset.fallbackApplied
            ) {

                return;

            }


            target.dataset.fallbackApplied =
                "true";


            target.style.background =
                "#f8eee9";

        },

        true
    );


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    createGallery();

    updateOrderSummary();


    console.log(
        "%cD.S. Bolos 🍰",
        `
            color: #7c2938;
            font-size: 20px;
            font-weight: bold;
        `
    );


    console.log(
        "%c30 bolos foram domesticados com sucesso.",
        `
            color: #c89a55;
            font-size: 12px;
        `
    );

});