// Fetch the data from the JSON file and generate tabs and accordion dynamically
fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // Tab List and Content
        const tabList = document.querySelector('#myTab');
        const tabContent = document.querySelector('#myTabContent');

        // Accordion Container
        const accordionContainer = document.querySelector('#accordionExample');

        // Clear existing tabs, content, and accordion if any
        tabList.innerHTML = '';
        tabContent.innerHTML = '';
        accordionContainer.innerHTML = '';

        // Loop through the data to generate tabs, content, and accordion
        data.forEach((item, index) => {
            const tabId = `tab-${index}`; // Unique ID for each tab
            const tabPaneId = `tab-pane-${index}`; // Unique ID for each tab pane

            // Create the tab
            const tabItem = document.createElement('li');
            tabItem.classList.add('nav-item');
            tabItem.setAttribute('role', 'presentation');

            const tabButton = document.createElement('button');
            tabButton.classList.add('nav-link');
            if (index === 0) tabButton.classList.add('active'); // Activate the first tab by default
            tabButton.id = tabId;
            tabButton.setAttribute('data-bs-toggle', 'tab');
            tabButton.setAttribute('data-bs-target', `#${tabPaneId}`);
            tabButton.setAttribute('type', 'button');
            tabButton.setAttribute('role', 'tab');
            tabButton.setAttribute('aria-controls', tabPaneId);
            tabButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            tabButton.textContent = item.title;

            tabItem.appendChild(tabButton);
            tabList.appendChild(tabItem);

            // Create the tab content
            const tabPane = document.createElement('div');
            tabPane.classList.add('tab-pane', 'fade');
            if (index === 0) tabPane.classList.add('show', 'active'); // Activate the first tab content by default
            tabPane.id = tabPaneId;
            tabPane.setAttribute('role', 'tabpanel');
            tabPane.setAttribute('aria-labelledby', tabId);
            tabPane.innerHTML = item.content; // Insert the content from the JSON file

            tabContent.appendChild(tabPane);

            // Create the accordion item
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');

            const accordionHeaderId = `heading-${index}`;
            const accordionCollapseId = `collapse-${index}`;

            accordionItem.innerHTML = `
                <h2 class="accordion-header" id="${accordionHeaderId}">
                    <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionCollapseId}" aria-expanded="${index === 0}" aria-controls="${accordionCollapseId}">
                        ${item.title}
                    </button>
                </h2>
                <div id="${accordionCollapseId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="${accordionHeaderId}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        ${item.content}
                    </div>
                </div>
            `;

            accordionContainer.appendChild(accordionItem);
        });
    })
    .catch(error => console.error('Error fetching JSON data:', error));