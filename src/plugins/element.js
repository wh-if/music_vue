import { ElButton,ElImage,ElBacktop, ElLink,ElDivider,ElIcon, ElMenu,ElCarousel,ElCarouselItem, ElMenuItem, ElHeader, ElContainer, ElMain, ElFooter,ElInput,ElAvatar } from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElMenu)
  app.use(ElMenuItem)
  app.use(ElHeader)
  app.use(ElContainer)
  app.use(ElMain)
  app.use(ElFooter)
  app.use(ElInput)
  app.use(ElAvatar)
  app.use(ElCarousel)
  app.use(ElCarouselItem)
  app.use(ElImage)
  app.use(ElDivider)
  app.use(ElLink)
  app.use(ElIcon)
  app.use(ElBacktop)
}
