const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Injecting env variables into process.env

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.user_id, name: user.last_name + ' ' + user.first_name, type: user.type_name }, process.env.SECRET_KEY, { expiresIn: '1d' });
}

const verify = (req, res, next) => {
    const authToken = req.cookies.token;
    if (!authToken) {
        res.status(401).json('You are not authenticated!');
    } else {
        jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json('Token is invalid!');
            } else {
                req.user = user;
                next(); // we go to the next middleware
            }
        })
    }
}

const verifyAdmin = (req, res, next) => {
    const authToken = req.cookies.token;
    if (!authToken) {
        res.status(401).json('You are not authenticated!');
    } else {
        jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json('Token is invalid!');
            } else {
                if (user.type !== 'admin') {
                    res.status(403).json('You are not authorized to perform this action!');
                } else {
                    req.user = user;
                    next(); // we go to the next middleware
                }
            }
        })
    }
}

const verifyProfessor = (req, res, next) => {
    const authToken = req.cookies.token;
    if (!authToken) {
        res.status(401).json('You are not authenticated!');
    } else {
        jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json('Token is invalid!');
            } else {
                if (user.type !== 'professor') {
                    res.status(403).json('You are not authorized to perform this action!');
                } else {
                    req.user = user;
                    next(); // we go to the next middleware
                }
            }
        })
    }
}

const validateLogin = (req, res, next) => {
    const errorMessages = {emailErr: '', passErr: ''};
    const { email, password } = req.body;
    
    if (!email) {
        errorMessages.emailErr = 'No email present';
    } 
    if (!password) {
        errorMessages.passErr = 'No password present';
    }

    if (errorMessages.emailErr || errorMessages.passErr) {
        res.status(500).json(errorMessages);     
    } else if (!errorMessages.emailErr && !errorMessages.passErr) {

        const checkEmail = validateEmail(email);
        if (checkEmail !== null) {
            errorMessages.emailErr = checkEmail;
        } 

        const checkPassword = validatePassword(password);
        if (checkPassword !== null) {
            errorMessages.passErr = checkPassword;
        }

        if (errorMessages.emailErr || errorMessages.passErr) {
            res.status(400).json(errorMessages);
        } else {
            req.user = { email, password };
            next();
        }
    }
}

const validateRegister = (req, res, next) => {
    const errorMessages = {
        lastErr: '',
        firstErr: '',
        emailErr: '',
        passErr: '',
        passErr2: ''
    };
    const { lastName, firstName, email, password, confirmPassword, role } = req.body;
    let newRole;

    if (role === 'individual' || role === 'student' || role === 'professor') {
        newRole = role;
    } else {
        newRole = 'individual';
    }

    if (!lastName) {
        errorMessages.lastErr = 'No last name present';
    }

    if (!firstName) {
        errorMessages.firstErr = 'No first name present';
    }

    if (!email) {
        errorMessages.emailErr = 'No email present';
    }

    if (!password) {
        errorMessages.passErr = 'No password present';
    }

    if (!confirmPassword) {
        errorMessages.passErr2 = 'Confirm your password'
    }

    let errorsFound = 0;
    for (const key of Object.keys(errorMessages)) {
        if (errorMessages[key]) {
            errorsFound += 1;
        }
    }

    if (errorsFound) {
        res.status(500).json(errorMessages);
    } else {
        const checkLastName = validateName(lastName);
        if (checkLastName !== null) {
            errorMessages.lastErr = checkLastName;
        }

        const checkFirstName = validateName(firstName);
        if (checkFirstName !== null) {
            errorMessages.firstErr = checkFirstName;
        }

        const checkEmail = validateEmail(email);
        if (checkEmail !== null) {
            errorMessages.emailErr = checkEmail;
        }

        const checkPassword = validatePassword(password);
        if (checkPassword !== null) {
            errorMessages.passErr = checkPassword;
        }

        if (checkPassword === null && password !== confirmPassword) {
            errorMessages.passErr2 = 'Passwords do not match';
        }

        let newErrorsFound = 0;
        for (const key of Object.keys(errorMessages)) {
            if (errorMessages[key]) {
                newErrorsFound += 1;
            }
        }

        if (newErrorsFound) {
            res.status(400).json(errorMessages);
        } else {
            req.user = { lastName, firstName, email, password, confirmPassword, newRole };
            next();
        }
    } 

}

const validateUpload = (req, res, next) => {
    const errorMessages = {
        docErr: '',
        thumbErr: '',
        titleErr: '',
        authErr: '',
        sumErr: '',
        pagErr: '',
        langErr: '',
        isbnErr: '',
        priceErr: '',
        defaultErr: ''
    };

    const { title, author, summary, pages, language, isbn, price } = req.body;
    const document = req.files.document;
    const thumbnail = req.files.thumbnail;

    if (!document) {
        errorMessages.docErr = 'No PDF document present';
    } else if (document.mimetype !== 'application/pdf') {
        errorMessages.docErr = 'Document needs to be in .PDF format';
    }

    if (!thumbnail) {
        errorMessages.thumbErr = 'No cover page document present';
    } else if (thumbnail.mimetype !== 'image/png' && thumbnail.mimetype !== 'image/jpeg' && thumbnail.mimetype !== 'image/jpg') {
        errorMessages.thumbErr = 'Cover page needs to be in one of the following formats: PNG, JPEG, or JPG';
    }

    if (!title) {
        errorMessages.titleErr = 'No title present';
    }

    if (!author) {
        errorMessages.authErr = 'No author present';
    }

    if (!summary) {
        errorMessages.sumErr = 'No summary present';
    }

    if (!pages) {
        errorMessages.pagErr = 'No number of pages present';
    }

    if (!language) {
        errorMessages.langErr = 'No language present';
    }

    if (!isbn) {
        errorMessages.isbnErr = 'No ISBN present';
    }

    if (!price || (price.length < 1 && Number(price) <= 0)) {
        errorMessages.priceErr = 'No price present';
    }

    let errorsFound = 0;
    for (const key of Object.keys(errorMessages)) {
        if (errorMessages[key]) {
            errorsFound += 1;
        }
    }

    if (errorsFound) {
        errorMessages.defaultErr = 'There are errors in your input fields';
        res.status(500).json(errorMessages);
    } else {
        const checkTitle = validateTitle(title);
        if (checkTitle !== null) {
            errorMessages.titleErr = checkTitle;
        }

        const checkAuthor = validateAuthor(author);
        if (checkAuthor !== null) {
            errorMessages.authErr = checkAuthor;
        }

        const checkSummary = validateTitle(summary);
        if (checkSummary !== null) {
            errorMessages.sumErr = checkSummary;
        }

        const checkPages = validatePages(pages);
        if (checkPages !== null) {
            errorMessages.pagErr = checkPages;
        }

        const checkLanguage = validateLanguage(language);
        if (checkLanguage !== null) {
            errorMessages.langErr = checkLanguage;
        }

        const checkISBN = validateISBN(isbn);
        if (checkISBN !== null) {
            errorMessages.isbnErr = checkISBN;
        }

        const checkPrice = validatePrice(price);
        if (checkPrice !== null) {
            errorMessages.priceErr = checkPrice;
        }

        let newErrorsFound = 0;
        for (const key of Object.keys(errorMessages)) {
            if (errorMessages[key]) {
                newErrorsFound += 1;
            }
        }

        if (newErrorsFound) {
            errorMessages.defaultErr = 'There are errors in your input fields';
            res.status(400).json(errorMessages);
        } else {
            req.details = { document, thumbnail, title, author, summary, pages, language, isbn, price };
            next();
        }
    }
}

const validateCredUpdate = (req, res, next) => {
    const errorMessages = {
        fNameErr: '',
        lNameErr: '',
        emailErr: ''
    };

    const { last_name, first_name, email } = req.body;

    if (!last_name) {
        errorMessages.lNameErr = 'No last name present';
    }

    if (!first_name) {
        errorMessages.fNameErr = 'No first name present';
    }

    if (!email) {
        errorMessages.emailErr = 'No email present';
    }


    let errorsFound = 0;
    for (const key of Object.keys(errorMessages)) {
        if (errorMessages[key]) {
            errorsFound += 1;
        }
    }

    if (errorsFound) {
        res.status(500).json(errorMessages);
    } else {
        const checkFirstName = validateName(first_name);
        if (checkFirstName !== null) {
            errorMessages.fNameErr = checkFirstName;
        }

        const checkLastName = validateName(last_name);
        if (checkLastName !== null) {
            errorMessages.lNameErr = checkLastName;
        }

        const checkEmail = validateEmail(email);
        if (checkEmail !== null) {
            errorMessages.emailErr = checkEmail;
        }

        let newErrorsFound = 0;
        for (const key of Object.keys(errorMessages)) {
            if (errorMessages[key]) {
                newErrorsFound += 1;
            }
        }

        if (newErrorsFound) {
            res.status(400).json(errorMessages);
        } else {
            req.details = { last_name, first_name, email };
            next();
        }
    }
}

const validateAdminProductUpload = (req, res, next) => {
    const errorMessages = {
        docErr: '',
        thumbErr: '',
        titleErr: '',
        authErr: '',
        sumErr: '',
        pagErr: '',
        langErr: '',
        isbnErr: '',
        priceErr: '',
        publisherErr: '',
        dateErr: '',
        defaultErr: ''
    };

    const { title, author, summary, pages, language, isbn, price, date, publisher, documentName, thumbnailName } = req.body;
    let document = null;
    let thumbnail = null;
    
    if (req.files !== null) {
        if (req.files.document !== null) {
            document = req.files.document;
        }

        if (req.files.thumbnail !== null) {
            thumbnail = req.files.thumbnail;
        }
    }

    if (document === null) {
        if (!documentName) {
            errorMessages.docErr = 'No PDF document present';
        } 
    } else if (document.mimetype !== 'application/pdf') {
        errorMessages.docErr = 'Document needs to be in .PDF format';
    }

    if (thumbnail === null) {
        if (!thumbnailName) {
            errorMessages.thumbErr = 'No cover page document present';
        }
    } else if (thumbnail.mimetype !== 'image/png' && thumbnail.mimetype !== 'image/jpeg' && thumbnail.mimetype !== 'image/jpg') {
        errorMessages.thumbErr = 'Cover page needs to be in one of the following formats: PNG, JPEG, or JPG';
    }

    if (!title) {
        errorMessages.titleErr = 'No title present';
    }

    if (!author) {
        errorMessages.authErr = 'No author present';
    }

    if (!summary) {
        errorMessages.sumErr = 'No summary present';
    }

    if (!pages) {
        errorMessages.pagErr = 'No number of pages present';
    }

    if (!language) {
        errorMessages.langErr = 'No language present';
    }

    if (!isbn) {
        errorMessages.isbnErr = 'No ISBN present';
    }

    if (!price || (price.length < 1 && Number(price) <= 0)) {
        errorMessages.priceErr = 'No price present';
    }

    if (!publisher) {
        errorMessages.publisherErr = 'No publisher present';
    }

    if (!date) {
        errorMessages.dateErr = 'No date published present';
    }

    let errorsFound = 0;
    for (const key of Object.keys(errorMessages)) {
        if (errorMessages[key]) {
            errorsFound += 1;
        }
    }

    if (errorsFound) {
        errorMessages.defaultErr = 'There are errors in your input fields';
        res.status(500).json(errorMessages);
    } else {
        const checkTitle = validateTitle(title);
        if (checkTitle !== null) {
            errorMessages.titleErr = checkTitle;
        }

        const checkAuthor = validateMultipleAuthors(author);
        if (checkAuthor !== null) {
            errorMessages.authErr = checkAuthor;
        }

        const checkSummary = validateTitle(summary);
        if (checkSummary !== null) {
            errorMessages.sumErr = checkSummary;
        }

        const checkPages = validatePages(pages);
        if (checkPages !== null) {
            errorMessages.pagErr = checkPages;
        }

        const checkLanguage = validateLanguage(language);
        if (checkLanguage !== null) {
            errorMessages.langErr = checkLanguage;
        }

        if (isbn !== 'N/A') {
            const checkISBN = validateISBN(isbn);
            if (checkISBN !== null) {
                errorMessages.isbnErr = checkISBN;
            }
        }

        const checkPrice = validatePrice(price);
        if (checkPrice !== null) {
            errorMessages.priceErr = checkPrice;
        }

        const checkPublisher = validateTitle(publisher);
        if (checkPublisher !== null) {
            errorMessages.publisherErr = checkPublisher;
        }

        const checkDate = validateDate(date);
        if (checkDate !== null) {
            errorMessages.dateErr = checkDate;
        }

        let newErrorsFound = 0;
        for (const key of Object.keys(errorMessages)) {
            if (errorMessages[key]) {
                newErrorsFound += 1;
            }
        }

        if (newErrorsFound) {
            errorMessages.defaultErr = 'There are errors in your input fields';
            res.status(400).json(errorMessages);
        } else {
            req.details = { document, thumbnail, title, author, summary, pages, language, isbn, price, publisher, date, documentName, thumbnailName };
            next();
        }
    }
}

const validateAdminNewProductUpload = (req, res, next) => {
    const errorMessages = {
        docErr: '',
        thumbErr: '',
        titleErr: '',
        authErr: '',
        sumErr: '',
        pagErr: '',
        langErr: '',
        isbnErr: '',
        priceErr: '',
        publisherErr: '',
        dateErr: '',
        defaultErr: ''
    };

    const { title, author, summary, pages, language, isbn, price, date, publisher } = req.body;
    let document = req.files.document;
    let thumbnail = req.files.thumbnail;

    if (!document) {
        errorMessages.docErr = 'No PDF document present';
    } else if (document.mimetype !== 'application/pdf') {
        errorMessages.docErr = 'Document needs to be in .PDF format';
    }

    if (!thumbnail) {
        errorMessages.thumbErr = 'No cover page document present';
    } else if (thumbnail.mimetype !== 'image/png' && thumbnail.mimetype !== 'image/jpeg' && thumbnail.mimetype !== 'image/jpg') {
        errorMessages.thumbErr = 'Cover page needs to be in one of the following formats: PNG, JPEG, or JPG';
    }

    if (!title) {
        errorMessages.titleErr = 'No title present';
    }

    if (!author) {
        errorMessages.authErr = 'No author present';
    }

    if (!summary) {
        errorMessages.sumErr = 'No summary present';
    }

    if (!pages) {
        errorMessages.pagErr = 'No number of pages present';
    }

    if (!language) {
        errorMessages.langErr = 'No language present';
    }

    if (!isbn) {
        errorMessages.isbnErr = 'No ISBN present';
    }

    if (!price || (price.length < 1 && Number(price) <= 0)) {
        errorMessages.priceErr = 'No price present';
    }

    if (!publisher) {
        errorMessages.publisherErr = 'No publisher present';
    }

    if (!date) {
        errorMessages.dateErr = 'No date published present';
    }

    let errorsFound = 0;
    for (const key of Object.keys(errorMessages)) {
        if (errorMessages[key]) {
            errorsFound += 1;
        }
    }

    if (errorsFound) {
        errorMessages.defaultErr = 'There are errors in your input fields';
        res.status(500).json(errorMessages);
    } else {
        const checkTitle = validateTitle(title);
        if (checkTitle !== null) {
            errorMessages.titleErr = checkTitle;
        }

        const checkAuthor = validateMultipleAuthors(author);
        if (checkAuthor !== null) {
            errorMessages.authErr = checkAuthor;
        }

        const checkSummary = validateTitle(summary);
        if (checkSummary !== null) {
            errorMessages.sumErr = checkSummary;
        }

        const checkPages = validatePages(pages);
        if (checkPages !== null) {
            errorMessages.pagErr = checkPages;
        }

        const checkLanguage = validateLanguage(language);
        if (checkLanguage !== null) {
            errorMessages.langErr = checkLanguage;
        }

        if (isbn !== 'N/A') {
            const checkISBN = validateISBN(isbn);
            if (checkISBN !== null) {
                errorMessages.isbnErr = checkISBN;
            }
        }

        const checkPrice = validatePrice(price);
        if (checkPrice !== null) {
            errorMessages.priceErr = checkPrice;
        }

        const checkPublisher = validateTitle(publisher);
        if (checkPublisher !== null) {
            errorMessages.publisherErr = checkPublisher;
        }

        const checkDate = validateDate(date);
        if (checkDate !== null) {
            errorMessages.dateErr = checkDate;
        }

        let newErrorsFound = 0;
        for (const key of Object.keys(errorMessages)) {
            if (errorMessages[key]) {
                newErrorsFound += 1;
            }
        }

        if (newErrorsFound) {
            errorMessages.defaultErr = 'There are errors in your input fields';
            res.status(400).json(errorMessages);
        } else {
            req.details = { document, thumbnail, title, author, summary, pages, language, isbn, price, publisher, date };
            next();
        }
    }
}

const validateEmail = (email) => {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(email)) {
        return 'Email address not valid';
    }

    return null;
}

const validatePassword = (pass) => {
    const hasWhitespace = /^(?=.*\s)/;
    const hasOneUpperCaseLetter = /^(?=.*[A-Z])/;
    const hasOneLowerCaseLetter = /^(?=.*[a-z])/;
    const hasOneDigit = /^(?=.*[0-9])/;
    const hasOneSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_])/;
    const validLength = /^.{16,20}$/;

    if (hasWhitespace.test(pass)) {
        return 'Password should not contain whitespaces';
    }

    if (!hasOneUpperCaseLetter.test(pass)) {
        return 'Password should have at least one uppercase letter';
    }

    if (!hasOneLowerCaseLetter.test(pass)) {
        return 'Password should have at least one lowercase letter';
    }

    if (!hasOneDigit.test(pass)) {
        return 'Password should have at least one digit';
    }

    if (!hasOneSymbol.test(pass)) {
        return 'Password should have at least one special character';
    }

    if (!validLength.test(pass)) {
        return 'Password should be between 16 and 20 characters long';
    }

    return null;
}

const validateName = (name) => {
    const hasFirstUpperRestLower = /^[A-Z]([a-z]+)$/;
    const hasWhitespace = /^(?=.*\s)/;
    const validLength = /^.{1,70}$/;
    
    if (!hasFirstUpperRestLower.test(name)) {
        return 'Name should have its first letter uppercase and rest of letters lowercase. A name does not have special characters';
    }

    if (hasWhitespace.test(name)) {
        return 'Name should not contain whitespaces';
    }

    if (!validLength.test(name)) {
        return 'Name should have more than 1 character and less than 70';
    }

    return null;
}

const validateTitle = (title) => {
    const hasOneSymbol = /^(?=.*[~^`@#$%^&*+={}\[\]|\\:;<>/_])/;

    if (hasOneSymbol.test(title)) {
        return 'String cannot contain special characters. The only accepted special characters are: ?!,.';
    }

    return null;
}

const validateAuthor = (author) => {
    let authorArr = author.split(' ');
    if (authorArr.length > 1) {
        for (let elem of authorArr) {
            const checkName = validateName(elem.trim());
            if (checkName !== null) {
                return checkName;
            }
        }

        return null;
    } else {
        const checkName = validateName(authorArr[0].trim());
        if (checkName !== null) {
            return checkName;
        }

        return null;
    }
}

const validateMultipleAuthors = (author) => {
    let authorArr = author.split(',');
    if (authorArr.length > 1) {
        for (let elem of authorArr) {
            const nameArr = elem.trim().split(' ');
            if (nameArr.length > 1) {
                for (let nameElem of nameArr) {
                    const checkName = validateName(nameElem.trim());
                    if (checkName !== null) {
                        return checkName;
                    }
                }
            } else {
                const checkName = validateName(nameArr[0].trim());
                if (checkName !== null) {
                    return checkName;
                }
            }

            /* --- The below code works for when there is a comma-separated list of authors --- */
            // DO NOT DELETE!!!

            // if (elem.lastName !== undefined) {
            //     const checkLastName = validateName(elem.lastName.trim());
            //     if (checkLastName !== null) {
            //         return checkLastName;
            //     }
            // }
        }

        return null;
    } else {
        const nameArr = authorArr.join('').trim().split(' ');
        if (nameArr.length > 1) {
            for (let nameElem of nameArr) {
                const checkName = validateName(nameElem.trim());
                if (checkName !== null) {
                    return checkName;
                }
            }
        } else {
            const checkName = validateName(nameArr[0].trim());
            if (checkName !== null) {
                return checkName;
            }
        }

        // const checkLastName = validateName(authorObj[0].lastName.trim());
        // if (checkLastName !== null) {
        //     return checkLastName;
        // }

        return null;
    }
}

const validatePages = (pages) => {
    const hasDigitsOnly = /^[0-9]+$/;
    const validLength = /^.{2,5}$/;

    if (!hasDigitsOnly.test(pages)) {
        return 'Pages field needs to contain only digits';
    }

    if (!validLength.test(pages)) {
        return 'Your book cannot have less than 10 pages and more than 99999 pages';
    }

    return null;
}

const validateLanguage = (language) => {
    if (language.toLowerCase() !== 'english' && language.toLowerCase() !== 'romanian') {
        return 'Language can only be either English or Romanian';
    }

    return null;
}

const validateISBN = (isbn) => {
    if (isbn.toLowerCase() !== 'n/a') {
        const hasDigitsOnly = /^[0-9]+$/;
        const validLength = /^.{13}$/;

        if (!hasDigitsOnly.test(isbn)) {
            return 'An ISBN needs to contain digits only';
        }

        if (!validLength.test(isbn)) {
            return 'An ISBN needs to have 13 digits (ISBN-13 version)';
        }

        return null;
    } else {
        return null;
    }
}

const validatePrice = (price) => {
    // this RegExp ensures that the price is in the format '###.##'
    const validPriceFormat = /^(\d{1,3}([.](?=\d{2}))\d{1,2})?$/;

    if (!validPriceFormat.test(price)) {
        return 'Price field needs to contain values in the the following format: ###.##; There needs to be a maximum of 3 digits before the point and 2 mandatory digits after the point.';
    }

    return null;
}

const validateDate = (date) => {
    if (Number.isNaN(date)) {
        return 'Date field is not a valid year integer.';
    } else if (date > new Date().getFullYear()) {
        return 'Date field should not be in the future.';
    } else if (date < 1920) {
        return 'Date field should not be older than 1920.';
    }

    return null;
}

module.exports = {
    generateAccessToken,
    verify,
    verifyAdmin,
    verifyProfessor,
    validateLogin,
    validateRegister,
    validateUpload,
    validateCredUpdate,
    validateAdminProductUpload,
    validateAdminNewProductUpload
};