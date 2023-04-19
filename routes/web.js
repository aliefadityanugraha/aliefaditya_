const express = require('express')
const router = express.Router()

const mainController = require('../controller/mainController')
const authController = require('../controller/authController')
const forgotController = require('../controller/forgotController')
const accountController = require('../controller/accountController')
const dashboardController = require('../controller/dashboardController')
const adminController = require('../controller/adminController.js')
const reportController = require('../controller/reportController')
const searchController = require('../controller/searchController')
const errorController = require('../controller/errorController')

const {authUser, accountAcces, adminPageAccess} = require('../middleware/authMiddleware')

router.get('/', mainController.home)
router.get('/page/:page', mainController.home)
router.get('/read/:slug', mainController.read)
router.get('/about', mainController.about)
router.get('/report', reportController.report)
router.post('/report', reportController.storeReport)
router.post('/search', searchController.search)
router.get('/category', mainController.category)

router.get('/register', authController.register)
router.post('/register', authController.store)
router.get('/login', authController.login)
router.post('/login', authController.authentication)
router.get('/logout', authController.logout)
router.get('/forgotpass', forgotController.forgotPass)
router.post('/forgotpass', forgotController.sendEmail)
router.get('/auth/reset/:key', forgotController.resetPass)
router.put('/auth/reset/:key', forgotController.updatePassword)

router.get('/dashboard/:account', authUser, accountAcces, dashboardController.dashboard)
router.get('/dashboard/:account/postingan', authUser, accountAcces, dashboardController.postingan)
router.get('/dashboard/:account/create',authUser, accountAcces, dashboardController.createView)
router.post('/dashboard/:account/create',authUser, accountAcces, dashboardController.insertArticle)
router.get('/dashboard/:account/update/:slug',authUser, accountAcces, dashboardController.updateView)
router.put('/dashboard/:account/update/:slug',authUser, accountAcces, dashboardController.updateArticle)
router.delete('/dashboard/:account/delete/:slug',authUser, accountAcces, dashboardController.deleteArticle)

// router.get('/dashboard',authUser,adminPageAccess('adminAccount'), adminController.dashboard)
// router.get('/data-user',authUser,adminPageAccess('adminAccount'), adminController.dataUser)
router.get('/data-artikel',authUser,adminPageAccess('adminAccount'), adminController.dataArtikel)
router.get('/create',authUser,adminPageAccess('adminAccount'), adminController.createView)
router.post('/create',authUser,adminPageAccess('adminAccount'), adminController.insertArticle)

router.get('/update/:slug',authUser,adminPageAccess('adminAccount'), adminController.updateView)
router.put('/update/:slug',authUser,adminPageAccess('adminAccount'), adminController.updateArticle)

router.delete('/delete/:slug',authUser,adminPageAccess('adminAccount'), adminController.deleteArticle)

router.get('/account/:account',authUser, accountAcces, mainController.account)
router.put('/account/:account', authUser, accountController.updatePassword)
router.delete('/account/:account', authUser, accountController.deleteAccount)
router.post('/account/:account', authUser, accountController.saveDataUser)
router.post('/profile/:account', authUser, accountController.profilePicture)

// always in last
router.get('/*', errorController.error404)

module.exports = router;