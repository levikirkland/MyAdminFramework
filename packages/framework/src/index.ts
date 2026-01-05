import type { App } from 'vue'
import MaButton from './components/MaButton.vue'
import MaCard from './components/MaCard.vue'
import MaLayout from './components/MaLayout.vue'
import MaSidebar from './components/MaSidebar.vue'
import MaHeader from './components/MaHeader.vue'
import MaTable from './components/MaTable.vue'
import MaModal from './components/MaModal.vue'
import MaInput from './components/MaInput.vue'
import MaBadge from './components/MaBadge.vue'
import MaToast from './components/MaToast.vue'
import MaSwitch from './components/MaSwitch.vue'
import MaDropdown from './components/MaDropdown.vue'
import MaSelect from './components/MaSelect.vue'
import MaCheckbox from './components/MaCheckbox.vue'
import MaRadio from './components/MaRadio.vue'
import MaTextarea from './components/MaTextarea.vue'
import MaFormGroup from './components/MaFormGroup.vue'
import MaBreadcrumb from './components/MaBreadcrumb.vue'
import MaTabs from './components/MaTabs.vue'
import MaRow from './components/MaRow.vue'
import MaCol from './components/MaCol.vue'
import MaAvatar from './components/MaAvatar.vue'
import MaTag from './components/MaTag.vue'
import MaAlert from './components/MaAlert.vue'
import MaTooltip from './components/MaTooltip.vue'
import MaChart from './components/MaChart.vue'
import MaDatePicker from './components/MaDatePicker.vue'
import MaTimePicker from './components/MaTimePicker.vue'
import MaUpload from './components/MaUpload.vue'
import MaDrawer from './components/MaDrawer.vue'
import MaSkeleton from './components/MaSkeleton.vue'
import MaTimeline from './components/MaTimeline.vue'
import MaTimelineItem from './components/MaTimelineItem.vue'
import MaSteps from './components/MaSteps.vue'
import MaStep from './components/MaStep.vue'
import MaAccordion from './components/MaAccordion.vue'
import MaAccordionItem from './components/MaAccordionItem.vue'
import MaPagination from './components/MaPagination.vue'
import MaProgress from './components/MaProgress.vue'
import MaEmpty from './components/MaEmpty.vue'
import MaSpinner from './components/MaSpinner.vue'
import MaStatistic from './components/MaStatistic.vue'
import MaIcon from './components/MaIcon.vue'
import MaNotification from './components/MaNotification.vue'
import MaRichTextEditor from './components/MaRichTextEditor.vue'
import MaTree from './components/MaTree.vue'
import MaThemeCustomizer from './components/MaThemeCustomizer.vue'
import MaKanban from './components/MaKanban.vue'
import MaCalendar from './components/MaCalendar.vue'
import MaTreeSelect from './components/MaTreeSelect.vue'
import { MaConfirm } from './utils/confirm'
import { useTheme } from './composables/useTheme'
import { useToast } from './composables/useToast'
import { useForm } from './composables/useForm'
import { usePermission } from './composables/usePermission'
import { useNotification } from './composables/useNotification'
import { useCrud } from './composables/useCrud'
import { createApiClient } from './utils/request'
import { globalErrorHandler } from './plugins/globalErrorHandler'
import { vPermission } from './directives/v-permission'
import MaCommandPalette from './components/MaCommandPalette.vue'
import MaAiAssistant from './components/MaAiAssistant.vue'
import MaAiChat from './components/MaAiChat.vue'
import MaErrorBoundary from './components/MaErrorBoundary.vue'
import MaVideoThumbnail from './components/MaVideoThumbnail.vue'
import MaStatWidget from './components/MaStatWidget.vue'
import MaActivityFeed from './components/MaActivityFeed.vue'
import MaTaskList from './components/MaTaskList.vue'
import MaUserProfile from './components/MaUserProfile.vue'
import MaPricingCard from './components/MaPricingCard.vue'
import MaNavbar from './components/MaNavbar.vue'
import MaShoppingCart from './components/MaShoppingCart.vue'
import MaCheckout from './components/MaCheckout.vue'
import MaRecipe from './components/MaRecipe.vue'
import MaJobListing from './components/MaJobListing.vue'
import MaJobCard from './components/MaJobCard.vue'
import MaTestimonial from './components/MaTestimonial.vue'
import MaBlogCard from './components/MaBlogCard.vue'
import MaPropertyCard from './components/MaPropertyCard.vue'
import MaCourseCard from './components/MaCourseCard.vue'
import MaTeamMember from './components/MaTeamMember.vue'
import MaFaq from './components/MaFaq.vue'
import MaNewsletter from './components/MaNewsletter.vue'
import MaFooter from './components/MaFooter.vue'
import { useBreakpoint } from './composables/useBreakpoint'
import { useRouterHelper } from './composables/useRouterHelper'
import { useA11y } from './composables/useA11y'
import { sanitizeHtml, escapeHtml } from './utils/security'

export {
  MaButton,
  MaCard,
  MaLayout,
  MaSidebar,
  MaHeader,
  MaTable,
  MaModal,
  MaInput,
  MaBadge,
  MaToast,
  MaSwitch,
  MaDropdown,
  MaSelect,
  MaCheckbox,
  MaRadio,
  MaTextarea,
  MaFormGroup,
  MaBreadcrumb,
  MaTabs,
  MaRow,
  MaCol,
  MaAvatar,
  MaTag,
  MaAlert,
  MaTooltip,
  MaChart,
  MaDatePicker,
  MaTimePicker,
  MaUpload,
  MaDrawer,
  MaSkeleton,
  MaTimeline,
  MaTimelineItem,
  MaSteps,
  MaStep,
  MaAccordion,
  MaAccordionItem,
  MaPagination,
  MaProgress,
  MaEmpty,
  MaSpinner,
  MaStatistic,
  MaIcon,
  MaNotification,
  MaRichTextEditor,
  MaTree,
  MaTreeSelect,
  MaKanban,
  MaCalendar,
  MaCommandPalette,
  MaAiAssistant,
  MaAiChat,
  MaErrorBoundary,
  MaVideoThumbnail,
  MaStatWidget,
  MaActivityFeed,
  MaTaskList,
  MaUserProfile,
  MaPricingCard,
  MaNavbar,
  MaShoppingCart,
  MaCheckout,
  MaRecipe,
  MaJobListing,
  MaJobCard,
  MaTestimonial,
  MaBlogCard,
  MaPropertyCard,
  MaCourseCard,
  MaTeamMember,
  MaFaq,
  MaNewsletter,
  MaFooter,
  MaConfirm,
  useTheme,
  useToast,
  useForm,
  usePermission,
  useNotification,
  useCrud,
  useBreakpoint,
  useRouterHelper,
  useA11y,
  createApiClient,
  globalErrorHandler,
  sanitizeHtml,
  escapeHtml,
  vPermission
}

export default {
  install: (app: App) => {
    app.component('MaButton', MaButton)
    app.component('MaCard', MaCard)
    app.component('MaLayout', MaLayout)
    app.component('MaSidebar', MaSidebar)
    app.component('MaHeader', MaHeader)
    app.component('MaTable', MaTable)
    app.component('MaModal', MaModal)
    app.component('MaInput', MaInput)
    app.component('MaBadge', MaBadge)
    app.component('MaToast', MaToast)
    app.component('MaSwitch', MaSwitch)
    app.component('MaDropdown', MaDropdown)
    app.component('MaSelect', MaSelect)
    app.component('MaCheckbox', MaCheckbox)
    app.component('MaRadio', MaRadio)
    app.component('MaTextarea', MaTextarea)
    app.component('MaFormGroup', MaFormGroup)
    app.component('MaBreadcrumb', MaBreadcrumb)
    app.component('MaTabs', MaTabs)
    app.component('MaRow', MaRow)
    app.component('MaCol', MaCol)
    app.component('MaAvatar', MaAvatar)
    app.component('MaTag', MaTag)
    app.component('MaAlert', MaAlert)
    app.component('MaTooltip', MaTooltip)
    app.component('MaChart', MaChart)
    app.component('MaDatePicker', MaDatePicker)
    app.component('MaTimePicker', MaTimePicker)
    app.component('MaUpload', MaUpload)
    app.component('MaDrawer', MaDrawer)
    app.component('MaSkeleton', MaSkeleton)
    app.component('MaTimeline', MaTimeline)
    app.component('MaTimelineItem', MaTimelineItem)
    app.component('MaSteps', MaSteps)
    app.component('MaStep', MaStep)
    app.component('MaAccordion', MaAccordion)
    app.component('MaAccordionItem', MaAccordionItem)
    app.component('MaPagination', MaPagination)
    app.component('MaProgress', MaProgress)
    app.component('MaEmpty', MaEmpty)
    app.component('MaSpinner', MaSpinner)
    app.component('MaStatistic', MaStatistic)
    app.component('MaIcon', MaIcon)
    app.component('MaNotification', MaNotification)
    app.component('MaRichTextEditor', MaRichTextEditor)
    app.component('MaTree', MaTree)
    app.component('MaTreeSelect', MaTreeSelect)
    app.component('MaThemeCustomizer', MaThemeCustomizer)
    app.component('MaKanban', MaKanban)
    app.component('MaCalendar', MaCalendar)
    app.component('MaAiAssistant', MaAiAssistant)
    app.component('MaAiChat', MaAiChat)
    app.component('MaCommandPalette', MaCommandPalette)
    app.component('MaErrorBoundary', MaErrorBoundary)
    app.component('MaVideoThumbnail', MaVideoThumbnail)
    app.component('MaStatWidget', MaStatWidget)
    app.component('MaActivityFeed', MaActivityFeed)
    app.component('MaTaskList', MaTaskList)
    app.component('MaUserProfile', MaUserProfile)
    app.component('MaNavbar', MaNavbar)
    app.component('MaPricingCard', MaPricingCard)
    app.component('MaShoppingCart', MaShoppingCart)
    app.component('MaCheckout', MaCheckout)
    app.component('MaRecipe', MaRecipe)
    app.component('MaJobListing', MaJobListing)
    app.component('MaJobCard', MaJobCard)
    app.component('MaTestimonial', MaTestimonial)
    app.component('MaBlogCard', MaBlogCard)
    app.component('MaPropertyCard', MaPropertyCard)
    app.component('MaCourseCard', MaCourseCard)
    app.component('MaTeamMember', MaTeamMember)
    app.component('MaFaq', MaFaq)
    app.component('MaNewsletter', MaNewsletter)
    app.component('MaFooter', MaFooter)
    
    app.directive('permission', vPermission)
  }
}
