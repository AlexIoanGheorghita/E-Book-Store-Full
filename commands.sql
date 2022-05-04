CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_type_id SMALLINT,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE user_types (
    user_type_id SMALLINT PRIMARY KEY CHECK(user_type_id >= 0 AND user_type_id <= 3),
    type_name VARCHAR(10) CHECK(type_name IN ('admin', 'professor', 'student', 'individual')) NOT NULL
);

ALTER TABLE users
ADD FOREIGN KEY(user_type_id) REFERENCES user_types(user_type_id),
ALTER COLUMN user_type_id SET NOT NULL;

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    product_id INTEGER,
    review_title VARCHAR(100) NOT NULL,
    review_description TEXT NOT NULL,
    rating NUMERIC(2,1) NOT NULL CHECK(rating >= 1.0 AND rating <= 5.0),
    review_date TIMESTAMP NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    publisher VARCHAR(150) NOT NULL DEFAULT 'Self-published',
    date_published SMALLINT NOT NULL CHECK (date_published >= 1900 AND date_published <= date_part('year', NOW())::SMALLINT),
    price NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    thumbnail_url VARCHAR(200) NOT NULL,
    document_url VARCHAR(200) NOT NULL,
    status_id SMALLINT
);

ALTER TABLE reviews
ADD FOREIGN KEY(product_id) REFERENCES products(product_id),
ALTER COLUMN product_id SET NOT NULL;

CREATE TABLE status (
    status_id SMALLINT PRIMARY KEY CHECK(status_id >= 0 AND status_id <= 2),
    status_name VARCHAR(8) NOT NULL CHECK(status_name IN ('pending', 'accepted', 'rejected'))
);

ALTER TABLE products
ADD FOREIGN KEY(status_id) REFERENCES status(status_id),
ALTER COLUMN status_id SET NOT NULL;

CREATE TABLE users_products_junction (
    user_id INTEGER REFERENCES users(user_id),
    product_id INTEGER REFERENCES products(product_id),
    PRIMARY KEY (user_id, product_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    order_date TIMESTAMP
);

CREATE TABLE products_orders_junction (
    order_id INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(user_id) UNIQUE
);

CREATE TABLE products_authors_junction (
    product_id INTEGER REFERENCES products(product_id),
    author_id INTEGER REFERENCES authors(author_id),
    PRIMARY KEY (product_id, author_id)
);

CREATE TABLE categories (
    category_id SMALLINT PRIMARY KEY,
    parent_cat_id SMALLINT,
    cat_name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE products_categories_junction (
    product_id INTEGER REFERENCES products(product_id),
    category_id INTEGER REFERENCES categories(category_id),
    PRIMARY KEY (product_id, category_id)
);

/* Example statement for altering a foreign key to have ON DELETE CASCADE */
ALTER TABLE products_authors_junction
DROP CONSTRAINT products_authors_junction_product_id_fkey,
ADD CONSTRAINT products_authors_junction_product_id_fkey
	FOREIGN KEY (product_id)
	REFERENCES products(product_id)
	ON DELETE CASCADE;


/* INSERT statements for populating the database */

INSERT INTO user_types (user_type_id, type_name) 
VALUES (0, 'admin'), (1, 'professor'), (2, 'student'), (3, 'individual');

INSERT INTO users (user_type_id, last_name, first_name, password, email)
VALUES (2, 'Francis', 'Connor', 'cc9f0a8cbd3d0db8ccf9a9597f441251cb7bb05d9c0a88504af850e677d94b8b', 'francis.a.connor@student.rau.ro'),
(2, 'Smith', 'Michael', 'af5fd0cecb5365e5d92e96b6c00289c31f50c756431cf347adbfaf5b41095b65', 'smith.dg.michael@student.rau.ro'),
(2, 'Popescu', 'Laura', '549efdbdfe9b525aaf62d70df04c4d373910f0834100911980f0106f433167cb', 'popescu.i.laura@student.rau.ro'),
(0, 'Gheorghita', 'Alexandru', '77d1076029e31afe49b5d2f7421df2648c686aeb7a25b82b94f51fac707b3244', 'alex.admin@rau.ro'),
(1, 'Vasilescu', 'Iuliana', '4f0d9332196dcde52f8f488bd9159a229498899ff5f8ecf0ba5dae5d4a3d760a', 'vasilescu.iuliana@profesor.rau.ro'),
(3, 'Lambert', 'John', '11bff2d484aaa5074c72737a7bf6dd37d0ec68fbd1f613d1c816cfbf6a77cce4', 'lambo3@yahoo.com'),
(3, 'Stanley', 'Karen', 'c7b49bf1131363bcd3127538995afd8cedddb18f4c51b58b6608e17c00ea4602', 'stanLee@gmail.com'),
(2, 'Marinescu', 'Greta', '986d05edd6d69c54abe627fefee2935bee22cd78bcda49d6c4a6d0782ba85905', 'marinescu.d.greta@student.rau.ro');

INSERT INTO status (status_id, status_name)
VALUES (0, 'pending'), (1, 'accepted'), (2, 'rejected');

INSERT INTO products (title, description, publisher, date_published, price, thumbnail_url, document_url, status_id)
VALUES ('Euro Area Economics', 'This book provides a very didactical and easy-to-read introduction to contemporary macroeconomics. The text covers the basic concepts and methods used in this field in an integrated manner. Theoretical considerations are consistently supported by real-world examples and various exercises. Special focus is given to various key aspects of the euro area economy. A rich set of multiple choice questions and answers are provided in a separate, accompanying exercises book.', 'BookBoon', 2018, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/euro_economics_area.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/euro_area_economics_basics.pdf', 1),
('A Practical Introduction to 3D Game Development', 'This book introduces the reader to the necessary programming skills necessary to develop 2D and 3D computer games. The book lists a number of common game mechanics, and illustrates through examples how these mechanics can be bound to each other to both give the required behavior and allow the player to interact with game elements. Additionally, there is a set of exercises at the end of each chapter that solidify reader''s understanding of the content. Chapter and sections are arranged in a non-linear way, which allows the reader to go smoothly from one chapter to another picking only topics of interest. Since programming is the main focus of the book, other content such as 3D graphics might look too simple to be useful for real game development. On the other hand, the code is neatly commented and organized to follow the best practices, which make it reusable, easily modifiable, and scalable for real projects.', 'BookBoon', 2014, 3.99, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/a_practical_introduction_to_3d_game_development.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/a_practical_introduction_to_3d_game_development.pdf', 1),
('A Step by Step R Tutorial', 'A Step-by- Step Tutorial in R has a two-fold aim: to learn the basics of R and to acquire basic skills for programming efficiently in R. Emphasis is on converting ideas about analysing data into useful R programs. It is stressed throughout that programming starts first by getting a clear understanding of the problem. Once the problem is well formulated the next phase is to write step-by-step code for execution by the R evaluator. Although A Step-by-Step Tutorial in R is primarily intended as a course directed by an instructor, it can also be used  with a little more effort  as a self-teaching option. The first 11 chapters form the core and deal with management of R objects, workspaces, functions, graphics, data structures, subscripting, search paths, evaluation environments, vectorised programming, mapping functions, loops, error tracing and statistical modelling. The optional final chapters take a closer look at analysis of variance and covariance and optimization techniques.', 'BookBoon', 2018, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/a_step_by_step_r_tutorial.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/a_step_by_step_r_tutorial.pdf', 1),
('Advanced Macroeconomics', 'The Advanced Macroeconomics book is useful to policy makers, planners, industry and academicians. This book gives two distinct parts. The first part provides the fundamentals of basic macroeconomic identities. The second part explains about the open economy and macro economy issues. In our global era, all economies are subjected to fluctuation of external factors. They are affected by exchange rates, balances of payment, income and inflation. Such indicators are more visible in the money, capital, equity and commodity markets. This book explains different issues and provides macroeconomic solutions at national and global levels. Therefore, this book especially helps postgraduate students to understand the subject in greater depth.', 'BookBoon', 2015, 2.99, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/advanced_macroeconomics.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/advanced_macroeconomics.pdf', 1),
('An Introduction to Accounting Theory', 'This online textbook is a one stop resource for accounting theory. The whole field is covered in plain language.

It begins by explaining what theory is, why and how agency theory underpins accounting and how to distinguish positive from normative theories. The book covers the IASB conceptual framework and its changing emphases, how accounting standards fit within the framework, and how standards exemplify theories of regulation. Capital market theory is covered with minimal mathematics, and accounting pathologies with minimal pontification. Theories of measurement and valuation are explained. Theories of accountability are compared. CSR, sustainability and integrated accounting are evaluated. In the final chapter issues in accounting that could emerge in the next millennium are discussed.

Far more than its wordier competitors, the book aims to develop the readers'' ability to think critically about accounting and be aware of its inconsistencies, assumptions and omissions.', 'BookBoon', 2018, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/an_introduction_to_accounting_theory.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/an_introduction_to_accounting_theory.pdf', 1),
('An Introduction to the Internet of Things', 'In times to come, the Internet of Things (IoT) will have an increasing impact on our lives. The IoT is used in smart homes, smart cities and touches every industry. Many have predicted that the IoT will be the next big digital revolution.
This book gives a comprehensive introduction to the IoT.
The first part of the book introduces embedded systems. Central topics are sensors, actuators and the architecture of embedded systems.
The second part of the book introduces the IoT, the architecture of the IoT, IoT communication and important IoT technologies. Other topics are also discussed like cloud computing and big data in connection with the IoT.', 'BookBoon', 2022, 1.99, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/an_introduction_to_the_internet_of_things.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/an_introduction_to_the_internet_of_things.pdf', 1),
('Around The World In Eighty Days', 'Around the World in Eighty Days is an adventure novel by the French writer Jules Verne, first published in French in 1872. In the story, Phileas Fogg of London and his newly employed French valet Passepartout attempt to circumnavigate the world in 80 days on a wager of £20,000 set by his friends at the Reform Club.', 'Project Gutenberg', 1994, 15.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/around_the_world_in_eighty_days.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/around_the_world_in_eighty_days.pdf', 1),
('Autobiography of Benjamin Franklin', 'The Autobiography of Benjamin Franklin is the traditional name for the unfinished record of his own life written by Benjamin Franklin from 1771 to 1790; however, Franklin himself appears to have called the work his Memoirs.', 'Project Gutenberg', 2006, 10.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/autobiography_of_benjamin_franklin.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/autobiography_of_benjamin_franklin.pdf', 1),
('Banking: An Introduction', 'This book presents an introduction to private sector banking (as opposed to central banking). Banks are at the very centre of the financial system. They act as intermediaries between all the four sectors of the economy) and all other financial intermediaries. They are also at the very centre of the money market, the market for short-term debt and deposits, marketable and non-marketable, and the interbank markets. They also create the all-important payments system. The banks are unique in that they are able to create new money (by new bank lending), and this is so because money is whatever is generally accepted as the means of payments / medium of exchange: bank deposits (notes and coins make up a minor part of the money stock). Because of this, and other reasons (moral hazard, for example) banks are also inherently unstable, and require robust regulation and supervision. Also because of this, banks are the target of monetary policy implementation.', 'BookBoon', 2015, 1.99, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/banking_an_introduction.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/banking_an_introduction.pdf', 1),
('Basics of Accounting & Information Processing', 'Formally defined, accounting is a set of concepts and techniques that are used to measure and report financial information about an economic unit. While this may seem relatively straightforward, accounting is actually a very complex field that requires both technical proficiency and also a certain amount of artistry. This text introduces new practitioners to accounting fundamentals and helps prepare them for further studies in the field. It is available to download as a free e-book.

In Part 1, the reader is shown the difference between financial and managerial accounting, and introduced to professional ethics and the fundamental accounting equation (Assets = Liabilities + Owners’ Equity). Using concrete examples based on everyday scenarios, the text then outlines how a corporation collects account receivable, makes purchases using loan proceeds, and distinguishes between revenue and income. Additional topics covered include financial statements, retained earnings, articulation, debit and credit rules, asset and expenses dividends, the accounting journal, and T-accounting. Diagrams and charts are used throughout the text to help explain important concepts.', 'BookBoon', 2014, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/basics_of_accounting_information_and_processing.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/basics_of_accounting_information_processing.pdf', 1),
('Consumer Behaviour and PR', 'This book provides an overview of consumer behaviour and public relations. Consumer behavior is the study of the processes involved in the purchase, use and disposal of products or services. The aim of public relations is to build positive relations between an organisation and its stakeholders. This textbook is an introductory textbook and it is aimed at undergraduate students of marketing. Each chapter in the textbook is enhanced by a series of case studies, both global and Australian, which reflect the changing nature of the marketplace. The textbook also covers contemporary topics such as digital media, social media marketing, sustainable marketing, greenwashing and ethics.', 'BookBoon', 2016, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/consumer_behavior_and_pr.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/consumer_behaviour_pr.pdf', 1),
('Consumer Psychology for the 21st Century', 'If you are ready to start a new business or launch a new product, you need this book. Although most entrepreneurs work long hours, most fail. Although most new products look good on the drawing board, most fail. Most of these failures are not due to lack of effort on the part of the marketers, but due to lack of insight into the minds of the consumers. It''s not about working harder, but working smarter. It''s not about having a bigger advertising budget, but spending it wisely. It''s not about doing more marketing research, but researching the right things, in the right way. This book provides insight into the eleven biggest stumbling blocks in front of you and how to overcome them. This book has been adopted as the textbook for the consumer behavior course at the University of the People, a tuition free university affiliated with the United Nations Global Alliance for Information and Communication Technologies and Development.', 'BookBoon', 2013, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/consumer_psychology_for_the_21_century.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/consumer_psychology_for_the_21st_century.pdf', 1),
('Corporate Finance', 'This book provides a comprehensive overview of the most important topics covered in a corporate finance course.

Subjects as Value and Opportunity Cost of Capital, Budgeting, Market efficiency and Options are explained.

The compendium is designed such that it mimics the structure of a typical corporate finance course. Throughout the compendium theory is supplemented with examples and illustrations.', 'BookBoon', 2014, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/corporate_finance.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/corporate_finance.pdf', 1),
('Crime and Punishment', 'Crime and Punishment follows the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who plans to kill an unscrupulous pawnbroker, an old woman who stores money and valuable objects in her flat.', 'Project Gutenberg', 2006, 19.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/crime_and_punishment.png', 'https://ebookthumbnails.blob.core.windows.net/documents/crime_and_punishment.pdf', 1),
('C# Programming Yellow Book', 'Learn C# from first principles the Rob Miles way. With jokes, puns, and a rigorous problem solving based approach. You can download all the code samples used in the book from here: http://www.robmiles.com/s/Yellow-Book-Code-Samples-64.zip.', 'Independently published', 2018, 5.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/c_sharp_programming_yellow_book.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/csharp_programming_yellow_book.pdf', 1),
('Database Design and Implementation', 'This book uses a simple step by step approach to explain the essential relational database design modelling techniques, and shows how Oracle SQL can be used to implement a database. There are numerous practical exercises with feedback.

Key topics include conceptual modelling using the crow''s feet notation and the Unified Modelling Language (UML), logical and physical modelling, normalisation, the structured query language (SQL) and simple application development using APEX forms and reports.', 'BookBoon', 2015, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/database_design_and_implementation.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/database_design_and_implementation.pdf', 1),
('Don Quixote', 'The plot revolves around the adventures of a member of the lowest nobility, an hidalgo ("Son of Someone"), from La Mancha named Alonso Quixano, who reads so many chivalric romances that he either loses or pretends to have lost his mind in order to become a knight-errant (caballero andante) to revive chivalry and serve his nation, under the name Don Quixote de la Mancha.', 'Project Gutenberg', 2004, 23.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/don_quixote.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/don_quixote.pdf', 1),
('Dracula', 'As an epistolary novel, the narrative is related through letters, diary entries, and newspaper articles. It has no single protagonist, but opens with solicitor Jonathan Harker taking a business trip to stay at the castle of a Transylvanian noble, Count Dracula. Harker escapes the castle after discovering that Dracula is a vampire, and the Count moves to England and plagues the seaside town of Whitby. A small group, led by Abraham Van Helsing, hunt Dracula and, in the end, kill him.', 'Project Gutenberg', 1995, 15.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/dracula.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/dracula.pdf', 1),
('Econometrics', 'Applying mathematical and statistical practices to economics, econometrics enables economists to test theoretical hypotheses with real world data. This Econometrics e-book is available as a free download. It provides simple explanations of key concepts in the field, with numerous examples and clear statistical tables for reference.

The text covers twelve important topics in econometrics, including basic probability and statistics, probability distributions, simple and multiple regression models, statistical inference, linear specification, dummy variables, heteroskedasticity, autocorrelation, multicollinearity, and simultaneous equation models.', 'BookBoon', 2014, 0.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/econometrics.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/econometrics.pdf', 1),
('Eloquent JavaScript 3rd Edition', 'JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.', 'No Starch Press', 2018, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/eloquent_javascript.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/eloquent_javascript.pdf', 1),
('Euro Area Economics Exercises', 'By complementing the basic textbook, this exercises book provides a rich set of multiple choice tests and answers. Based on 20 chapters, a detailed and easily accessible step-by-step review of the underlying macroeconomic concepts (as outlined in the basic textbook) is developed. A set of answers at the very end of the exercises book supplements the lessons.', 'BookBoon', 2021, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/euro_economics_area_exercises.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/euro_area_economics_exercises.pdf', 1),
('Evidence, Proof and Justice', 'This book uses legal philosophy to analyse the transformation of the rules of evidence in English courts. Issues such as adverse inferences from silence, fundamental rights of defendants, double jeopardy, public interest immunity and expert evidence and mathematical proof are critically assessed with a view to showing that the proliferation of statutes on evidence in English courts, the wide discretionary powers vested in judges to admit all types of evidence raise serious issues of justice and ''open impartiality'' as distinct from ''close impartiality''. Suggestions for reform are proffered.', 'BookBoon', 2014, 2.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/evidence_proof_and_justice.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/evidence_proof_and_justice.pdf', 1),
('Famous Men of the Middle Ages', 'The story of the Middle Ages is told through the lives of such men as Attila the Hun, Charlemagne, William the Conqueror, Edward the Black Prince, and Joan of Arc. The Famous Men of the Middle Ages guides readers through the turbulent "dark age" of history and sheds light on how the world transitioned from the end of ancient times to the birth of the modern era.', 'Project Gutenberg', 2003, 14.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/famous_men_of_the_middle_ages.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/famous_men_of_the_middle_ages.pdf', 1),
('Front-End Developer Handbook', 'A useful documentation about the knowledge and skills needed by a front-end developer in 2019.', 'Independently published', 2019, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/front_end_developer_handbook.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/frontend_developer_handbook.pdf', 1),
('Fundamentals of the Monetary Policy in the Euro Area', 'Central banks are among the most powerful actors in today''s financial markets. This notwithstanding, for the public, there remains a certain mysterious aura around these institutions and the way they work in practice. This book aims at shedding more light at central banks and monetary policy, with a particular focus at the euro area.', 'BookBoon', 2015, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/fundamentals_of_monetary_policy_in_the_euro_area.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/fundamentals_of_monetary_policy_in_the_euro_area.pdf', 1),
('How to Code in Python 3', 'A comprehensive tutorial on learning to code in the newest version of Python.', 'Digital Ocean', 2018, 2.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/how_to_code_in_python_3.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/how_to_code_in_python_3.pdf', 1),
('Introduction to E-Commerce', 'Commerce was and is the exchange of goods or services and money between suppliers and customers. Modern information and communication technologies have revolutionized the commercial world. 

The book gives a sound introduction to the fascinating world of E-Commerce. Readers with an economic background will learn which technologies help to change and improve business. Readers with a computer science background will learn, how business needs have to be incorporated into the development and operation of information systems. Thus the book not only examines technologies and the areas of B2C and B2B commerce, but also discusses legal issues and impacts of E-Commerce on the economic and societal area. Security management issues and payment challenges are investigated, too, and the course finishes with a focused view to performance management.', 'BookBoon', 2016, 1.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/introduction_to_e_commerce.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/introduction_to_e_commerce.pdf', 1),
('Introduction to the Law of Contract', 'Contract law permeates our lives. We make contracts for example when we purchase food and clothing, when we book a holiday, travel by bus or rent a flat. Contracts are also vital to organizations. An Introduction to Contract Law introduces the reader to the main concepts of the law of contract, and its role in relation to the individual and to business. It is designed for both law and non-law students. The book considers in turn each of the requirements for the formation of a contract, drawing from decided case law to illustrate and explain essential principles and terms and each chapter ends with a set of exercises to test the reader''s understanding and reinforce the key points of law. The law is presented in a clear and straightforward manner in order to make the book user-friendly and to enable students to navigate and understand the law of contract. The book offers a concise yet comprehensive account of the law, and makes the subject accessible without over-simplification.', 'BookBoon', 2016, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/introduction_to_the_law_of_contract.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/introduction_to_the_law_of_contract.pdf', 1),
('Investments: An Introduction', 'This introductory book covers the lifestyle choices faced by the individual over his/her life (the prudent conduct of which leads to early achievement of the elusive financial security goal - FSG), and the nuts and bolts and principles of investments. The individual has four distinct phases in his/her life. Each phase has its unique lifestyle choice-variables and therefore unique codes or rules that need to be recognised and adhered to in order to achieve the FSG as early as possible, and to preserve assets until exodus. Investing also has distinct codes, rules and principles. It is essential to have a good understanding of the financial system, which delivers the main asset classes: the financial asset classes (1) money market investments, (2) bonds and (3) shares. The other assets are real assets and the categories are (1) property, (2) commodities and (3) other real assets (art, antiques, rare stamps and the like).', 'BookBoon', 2015, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/investments_an_introduction.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/investments_an_introduction.pdf', 1),
('Law for Business Students', 'All business jurisdictions operate on a legal structure, and share the basic principles set out in this book.

Particular attention therefore is given to corporate law involving internal corporate structure, responsibilities of management, employee relations, the basic elements of contracts and negligence, and relations with suppliers, customers and lenders.

Attention is drawn to the formulation of the business plan, disclosure of operations and corporate opportunities, and the raising of funds in the private and public sector.', 'BookBoon', 2015, 2.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/law_for_business_students.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/law_for_business_students.pdf', 1),
('Learn Enough Command Line to be Dangerous', 'Learn Enough Command Line to Be Dangerous is an introduction to the command line for complete beginners, the first in a series of tutorials designed to teach the common foundations of “computer magic”  to as broad an audience as possible. It is aimed both at those who work with software developers and those who aspire to become developers themselves. Unlike most introductions to the command line, which typically assume a relatively high level of technical sophistication, Learn Enough Command Line to Be Dangerous assumes no prerequisites other than general computer knowledge (how to launch an application, how to use a web browser, how to touch type, etc.).', 'Independently Published', 2021, 15.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/learn_enough_command_line_to_be_dangerous.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/learn_enough_command_line_to_be_dangerous_a_tutorial_introduction_to_the_unix_command_line.pdf', 1),
('Legends of King Arthur and His Knights', '', 'Project Gutenberg', 2004, 17.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/legends_of_king_arthur_and_his_knights.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/legends_of_king_arthur_and_his_knights.pdf', 1),
('Essentials of Macroeconomics', 'In Macroeconomics the object is to study the performance, structure and behavior of a national or regional economy as a whole. The textbook provides a comprehensive overview of all facets from Macroeconomics.

Download the exercise book and test what you have learned.', 'BookBoon', 2014, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/essentials_of_macroeconomics.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/macroeconomics.pdf', 1),
('Essentials of Microeconomics', 'In this textbook you can read about how to develop models that describes how an economy works. The book provides a comprehensive overview of all facets from Microeconomics.

Starting with the market, consumers and producers followed by demand and production. You can also read about Monopoly, Price discrimination and Game theory.

Download the exercise book and test what you have learned.', 'BookBoon', 2008, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/essentials_of_microeconomics.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/microeconomics.pdf', 1),
('The Metamorphosis', 'Metamorphosis tells the story of salesman Gregor Samsa, who wakes one morning to find himself inexplicably transformed into a huge insect (ungeheueres Ungeziefer, lit. "monstrous vermin") and subsequently struggles to adjust to this new condition.', 'Project Gutenberg', 2005, 18.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/the_metamorphosis.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/metamorphosis.pdf', 1),
('Modern Microeconomics', 'This book provides the explanation of modern theories with simple examples. The consumer equilibrium, production function, game theory, information economics and social welfare are the major topics of this book. You will also find the systematic analysis of the consumer utility and behavior. It is most relevant topic to the decision making of consumer. The revealed preferences, rational choice, utility maximization, indirect utility function, Roy''s identity, Expenditure minimization function are the important topics of this book. Furthermore the book provides an explanation of modern theory of production function. There are different types of production functions and technology is used in each production function. Input output analysis, cost minimization, short run and long run costs, homogenous and heterogeneous production function, duality of costs and different types of technology in production function is strength of this book. The theory of Kalecki and kaldor of factor share in production function is also part of this book.', 'BookBoon', 2013, 1.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/modern_microeconomics.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/modern_microeconomics.pdf', 1),
('Myths and Legends of China', 'Chinese mythology includes many varied myths from regional and cultural traditions. Much of the mythology involves exciting stories full of fantastic people and beings, the use of magical powers, often taking place in an exotic mythological place or time.', 'Project Gutenberg', 2005, 19.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/myths_and_legends_of_china.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/myths_and_egends_of_china.pdf', 1),
('Myths and Legends of Ancient Greece and Rome', 'A guide to the pantheon of Greek and Roman gods and the myths weaved around them. Split into two parts, the first part giving biographies of the gods, the second part the famous legends.', 'Project Gutenberg', 2007, 19.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/myths_and_legends_of_ancient_greece_and_rome.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/myths_and_legends_of_ancient_greece_and_rome.pdf', 1),
('Object-Oriented Programming using C#', 'This book will explain the Object Oriented approach to programming and, through the use of small exercises for which feedback is provided, develop practical skills as well.', 'BookBoon', 2018, 1.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/object_oriented_programming_using_c_sharp.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/object_oriented_programming_using_csharp.pdf', 1),
('Object-Oriented Programming using Java', 'This book will explain the Object Oriented approach to programming and through the use of small exercises, for which feedback is provided, develop some practical skills as well. At the end of the book one larger case study will be used to illustrate the application of the techniques. This will culminate in the development of a complete Java program which can be downloaded with this book. Topics covered include : Abstraction, Inheritance, Polymorphism, Object Oriented Software Analysis and Design, The Unified Modelling Language (UML) , Agile Programming and Test Driven Development.', 'BookBoon', 2014, 1.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/object_oriented_programming_using_java.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/object_oriented_programming_using_java.pdf', 1),
('Partial Differential Equations', 'Partial differential equations form tools for modelling, predicting and understanding our world. Scientists and engineers use them in the analysis of advanced problems. In this eBook, award-winning educator Dr Chris Tisdell demystifies these advanced equations. Highlights of this eBook include: an integration of the lessons with YouTube videos; and the design of active learning spaces. By engaging with this eBook, its examples and Chris''s YouTube videos, you''ll be well-placed to better understand partial differential equations and their solutions techniques.', 'BookBoon', 2018, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/partial_differential_equations.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/partial_differential_equations.pdf', 1),
('Sport Management', 'This book begins with an introduction to sport management, explaining the scope of sport management as well as the sport manager''s responsibilities. The sport business environment, internal and external, is discussed in detail. Each of the four management functions, planning, organizing, leading and control are explained as well as leadership styles such as autocratic leaders, democratic leaders, participative leaders and laissez-fair leaders. Management roles, skills, levels and types of power are dealt with and give an understanding of what types of managers you get in a sport club. The section about finance management gives the reader an inside look of sources of funds, developing an sponsorship, budgeting and accounting and explains how to compile a income statement and balance sheet. This will help the reader to conduct his club''s own finances.', 'BookBoon', 2014, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/sport_management.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/sport_management.pdf', 1),
('Sport Organisation and Administration', 'This book begins with a discussion on what a sport organization is. The reader will develop an understanding of the different types of structures in a sport club, such as sole proprietorship, partnerships and nonprofit organizations. Three management theories that can be applied to a sport club are discussed, namely the works and ideas of Frederick, W. Taylor, Peter Drucker and W. Edwards Deming. The main elements of a club plan such as the club philosophy, vision and mission statement, goals, policies and procedures, club governance and organization structure are broadly explained. The reader will be able to compile such a club plan for his or her sport club. Clubs are increasingly using groups as their fundamental unit of organizational structure to respond more flexibly and quickly to rapidly changing environments. Group structures are therefore discussed as well as group processes.', 'BookBoon', 2014, 1.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/sport_organization_and_administration.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/sport_organisation_and_administration.pdf', 1),
('Sport Development, Law and Commercialization', 'This book is ideal for sports managers, administrators and sports organisers running a sports club or institution. People who would like to start a new club from scratch will also benefit from this book. This book can teach you about how to develop a sports club, what laws to apply and how to market your club successfully. This book also outlines sports contracts and how to prepare a contract according to the law.', 'BookBoon', 2015, 4.99, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/sports_development_law_and_commercialization.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/sports_development_law_and_commercialization.pdf', 1),
('Teach Yourself Java in 21 Days', 'Learn a concept of Java each day for 3 weeks to become an excellent Java programmer at the end!', 'Independently Published', 2007, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/teach_yourself_java_in_21_days.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/teach_yourself_java_in_21_days.pdf', 1),
('The Count of Monte Cristo', 'The Count of Monte Cristo is an adventure story that takes place during the historical events of 1815 to 1838. This piece tells the tale of a man who seeks revenge after his escape from prision and deals with the central themes of vengeance, justice, forgiveness, and mercy.', 'Project Gutenberg', 1998, 25.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/the_count_of_monte_cristo.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/the_count_of_monte_cristo.pdf', 1),
('The Adventures of Sherlock Holmes', 'The Adventures of Sherlock Holmes is a collection of twelve short stories by Arthur Conan Doyle, first published on 14 October 1892.', 'Project Gutenberg', 1999, 17.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/adventures_of_sherlock_holmes.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/the_adventures_of_sherlock_holmes.pdf', 1),
('The Three Musketeers', 'Set between 1625 and 1628, it recounts the adventures of a young man named d''Artagnan (a character based on Charles de Batz-Castelmore d''Artagnan) after he leaves home to travel to Paris, hoping to join the Musketeers of the Guard. Although d''Artagnan is not able to join this elite corps immediately, he is befriended by three of the most formidable musketeers of the age - Athos, Porthos and Aramis, "the three musketeers" or "the three inseparables" - and becomes involved in affairs of state and at court.', 'Project Gutenberg', 1998, 19.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/the_three_musketeers.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/the_three_musketeers.pdf', 1),
('The War of the Worlds', 'Written between 1895 and 1897,[2] it is one of the earliest stories to detail a conflict between mankind and an extra-terrestrial race. The novel is the first-person narrative of both an unnamed protagonist in Surrey and of his younger brother in London as southern England is invaded by Martians.', 'Project Gutenberg', 2004, 15.99, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/the_war_of_the_worlds.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/the_war_of_the_worlds.pdf', 1),
('The Wonderful Wizard of Oz', 'The story chronicles the adventures of a young Kansas farm girl named Dorothy in the magical Land of Oz after she and her pet dog Toto are swept away from their home by a tornado. Upon her arrival in Oz, she learns she cannot return home until she has destroyed the Wicked Witch of the West.', 'Project Gutenberg', 1993, 16.90, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/the_wonderful_wizard_of_oz.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/the_wonderful_wizard_of_oz.pdf', 1),
('Thinking in Java 4th Edition', '', 'Pearson', 2006, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/thinking_in_java.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/thinking_in_java_4th_edition.pdf', 1),
('Twenty Thousand Leagues Under the Sea', 'During the year 1866, ships of various nationalities sight a mysterious sea monster, which, it is later suggested, might be a gigantic narwhal. The U.S. government assembles an expedition in New York City to find and destroy the monster. Professor Pierre Aronnax, a French marine biologist and the story''s narrator, is in town at the time and receives a last-minute invitation to join the expedition; he accepts. Canadian whaler and master harpooner Ned Land and Aronnax''s faithful manservant Conseil are also among the participants.', 'Project Gutenberg', 1994, 19.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/twenty_thousand_leagues_under_the_sea.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/twenty_thousand_leagues_under_the_sea.pdf', 1),
('Web 2.0 and Social Media', 'Web 2.0 applications and social media have provided new venues for businesses to inform, understand and connect with their customers. This book provides a general understanding of using blogs, podcasts, live streaming, wikis, social buzz, social media, and more to enable businesses to rethink their approach and leverage new digital media''s advantages. Theoretical concepts such as RSS feeds and practical examples such as constructing a WordPress blog are covered in detail. Facebook, LinkedIn, Twitter, Reddit, Tumblr, Pinterest, Klout, and others are examined from a business perspective.', 'BookBoon', 2016, 0.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/web_2_and_social_media.JPG', 'https://ebookthumbnails.blob.core.windows.net/documents/web_2_and_social_media_for_business.pdf', 1),
('White Fang', 'The story details White Fang''s journey to domestication in Yukon Territory and the Northwest Territories during the 1890s Klondike Gold Rush. It is a companion novel (and a thematic mirror) to London''s best-known work, The Call of the Wild (1903), which is about a kidnapped, domesticated dog embracing his wild ancestry to survive and thrive in the wild.', 'Project Gutenberg', 1997, 14.00, 'https://ebookthumbnails.blob.core.windows.net/thumbnails/white_fang.jpg', 'https://ebookthumbnails.blob.core.windows.net/documents/white_fang.pdf', 1);

INSERT INTO categories (category_id, parent_cat_id, cat_name) 
VALUES (1, NULL, 'Fiction'),
(2, NULL, 'Non-Fiction'),
(3, NULL, 'Reference'),
(4, 1, 'Adventure'),
(5, 1, 'Horror'),
(6, 1, 'Mystery'),
(7, 1, 'Romance'),
(8, 1, 'Classics'),
(9, 1, 'Mythology'),
(10, 2, 'Self-Development'),
(11, 2, 'Lifestyle'),
(12, 2, 'Health'),
(13, 2, 'Biography'),
(14, 3, 'Computer Science'),
(15, 3, 'Business'),
(16, 3, 'Law'),
(17, 3, 'Tourism'),
(18, 3, 'Kinesiotherapy'),
(19, 3, 'European Studies'),
(20, 3, 'Finance');

INSERT INTO products_categories_junction (product_id, category_id)
VALUES (1, 3), (1, 15), (1, 19), (1, 20), (2, 3), (2, 14), (3, 3), (3, 14), (4, 3), (4, 15),
(5, 3), (5, 15), (5, 20), (6, 3), (6, 14), (7, 1), (7, 4), (7, 8),
(8, 2), (8, 13), (9, 3), (9, 15), (10, 3), (10, 15), (10, 20), (11, 3),
(11, 15), (11, 17), (12, 3), (12, 15), (12, 17), (13, 3), (13, 20),
(14, 1), (14, 8), (15, 3), (15, 14), (16, 3), (16, 14), (17, 1), (17, 4), (17, 8),
(18, 1), (18, 5), (18, 6), (19, 3), (19, 15), (20, 3), (20, 14), (21, 3), (21, 19),
(22, 3), (22, 16), (23, 2), (23, 13), (24, 3), (24, 14), (25, 3), (25, 19),
(26, 3), (26, 14), (27, 3), (27, 15), (27, 14), (28, 3), (28, 16), (29, 3),
(29, 15), (29, 20), (30, 3), (30, 15), (30, 16), (31, 3), (31, 14), (32, 1),
(32, 9), (33, 3), (33, 15), (34, 3), (34, 15), (35, 1), (35, 5), (36, 3), (36, 15),
(37, 1), (37, 9), (38, 1), (38, 9), (39, 3), (39, 14), (40, 3), (40, 14), (41, 3), (41, 14), (41, 15),
(42, 3), (42, 18), (43, 3), (43, 18), (44, 3), (44, 18), (45, 3), (45, 14), (46, 1), (46, 4), (46, 7),
(46, 8), (47, 1), (47, 6), (48, 1), (48, 4), (48, 8), (49, 1), (49, 5), (50, 1), (50, 4), (50, 8),
(51, 3), (51, 14), (52, 1), (52, 4), (52, 8), (53, 3), (53, 14), (54, 1), (54, 4);

INSERT INTO reviews (user_id, product_id, review_title, review_description, rating, review_date)
VALUES (18, 2, 'Very good book for aspiring game devs', 'I started to have a passion for game development in highschool. However, I didn''t find the best resources out there. This book, on the other hand, gave me a more real look into the life of a game developer. I see now that it is harder than I thought. But I still want to continue. Great book btw!', 5.0, NOW()),
(17, 11, 'Good book for understanding people, especially consumers', 'Very thoroughly written book, covering many interesting aspects pertaining to how consumers choose to buy certain products and not others. Some of these points would not have crossed my mind. Highly recommend it.', 5.0, NOW()),
(17, 18, 'A vampire cult classic', 'Let''s be honest, this book is the reason why Romania became so popular overseas. And to be frank, it does a really good job at giving yout the feel that you are being watched at all times by a "strigoi".', 4.0, NOW()),
(21, 18, 'Unique writing method', 'Bram Stoker employed a very interesting way of writing, by not having a single protagonist, and by narrating the story in the form of letters and conversations. It makes it feel more authentic.', 5.0, NOW()),
(18, 39, 'Finally a good book on C#', 'I have been looking everywhere for some sort of guide which would be both relatively easy to follow but also teach all the fundamentals, from beginner to advanced.', 5.0, NOW()),
(22, 47, 'Finding Watson', 'As a kid I have always been attracted to mysteries. Now, re-reading these stories makes me want to pursue my dream of becoming a detective.', 5.0, NOW()),
(22, 35, 'Not my cup of tea', 'I think I had the wrong impression when I read the description of this book. Personally, nt my favorite choice in the horror genre due to too much metamorphosis.', 3.5, NOW()),
(23, 37, 'I want to visit China now.', 'Loved all the details regarding the Chinese deitites. Now I am looking for airplane tickets to visit actual temple locations.', 5.0, NOW()),
(24, 31, 'Such a useful book for programmers', 'One of the core skills a programmer needs is undoubtably knowing how to use the command line, and this book does an extraordinary job at teaching those skills!', 5.0, NOW()),
(24, 20, 'Thorough guidance in the world of JavaScript', 'Updated edition shows everything you need to know from ES6 to almost ES7 or 8. Really good in my opinion.', 5.0, NOW()),
(18, 20, 'Very good book, but...', 'It''s a great book, don''t get me wrong, but I was hoping it would explain things in a more succint manner. Too much explanation leads to loss of focus.', 4.0, NOW());

INSERT INTO orders (user_id, order_date)
VALUES (17, NOW()), (18, NOW()), (21, NOW()), (22, NOW()), (23, NOW()), (24, NOW());

INSERT INTO products_orders_junction (order_id, product_id)
VALUES (1, 11), (1, 18), (2, 2), (2, 39), (2, 20),
(3, 18), (4, 47), (4, 35), (5, 37), (6, 31), (6, 20);

INSERT INTO users_products_junction (user_id, product_id)
VALUES (17, 11), (17, 18), (18, 2), (18, 39), (18, 20),
(21, 18), (22, 47), (22, 35), (23, 37), (24, 31), (24, 20);

INSERT INTO authors (author_name) 
VALUES ('Jules Verne'), ('Benjamin Franklin'), ('Fyodor Dostoevsky'),
('Miguel Cervantes'), ('Bram Stoker'), ('John H. Haaren'), ('A. B. Poland'),
('James Knowles'), ('Franz Kafka'), ('E. T. Werner'), ('E. M. Berens'),
('Arthur Conan Doyle'), ('Alexandre Dumas'), ('H. G. Wells'), 
('L. Frank Baum'), ('Jack London'), ('Yasser Jaffal'), ('Niel J le Roux'), ('Sugnet Lubbe'), 
('Sanjay Rode'), ('Gabriel Donleavy'), ('Einar Krogh'), ('AP Faure'), 
('Larry M. Walther'), ('Dr. Breda McCarthy'), ('T. L. Brink'), 
('Unknown Author'), ('Rob Miles'), ('Howard Gould'), ('Thomas Andren'),
('Marijn Haverbeke'), ('Dieter Gerdesmeier'), ('Solomon E. Salako'),
('Cody Lindley'), ('Lisa Tagliaferri'), ('Martin Kutz'), ('Sarah Field'),
('Lazar Sarna'), ('Michael Hartl'), ('Peter Jochumzen'), ('Krister Ahrlesten'),
('Simon Kendal'), ('Christopher C. Tisdell'), ('E. Eksteen'), ('Laura Lemay'), ('Charles L. Perkins'),
('Bruce Eckel'), ('Roger W. McHaney'), ('David Sachs');

INSERT INTO products_authors_junction (product_id, author_id)
VALUES (1, 32), (2, 17), (3, 18), (3, 19), (4, 20), (5, 21), (6, 22), (7, 1),
(8, 2), (9, 23), (10, 24), (11, 25), (12, 26), (13, 27), (14, 3), (15, 28), 
(16, 29), (17, 4), (18, 5), (19, 30), (20, 31), (21, 32), (22, 33), (23, 7), (23, 6),
(24, 34), (25, 32), (26, 35), (27, 36), (28, 37), (29, 23), (30, 38), (31, 39), (32, 8),
(33, 40), (34, 41), (35, 9), (36, 20), (37, 10), (38, 11), (39, 42), (40, 42),
(41, 43), (42, 44), (43, 44), (44, 44), (45, 45), (45, 46), (46, 13), (47, 12),
(48, 13), (49, 14), (50, 15), (51, 47), (52, 1), (53, 48), (53, 49), (54, 16);



/* ADDED NEW COLUMNS */

ALTER TABLE products
ADD COLUMN language VARCHAR(30);
ALTER TABLE products
ADD COLUMN num_pages SMALLINT CHECK(num_pages > 0);
ALTER TABLE products
ADD COLUMN isbn VARCHAR(17);  