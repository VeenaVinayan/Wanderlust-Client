export const AgentRoute = {
     AGENT_DASHBOARD:'/agent/dashboard',
}

export const Admin_Route ={
    ADMIN_CATEGORY_DELETE:"/admin/category-delete",
    ADMIN_CATEGORY_CHECK:"/admin/category-check",
    ADMIN_AGENT_PENDING:"/admin/agent-pending",
    ADMIN_APPROVE_AGENT:"/admin/approveAgent",
    ADMIN_REJECT_AGENT_REQUEST:"/admin/rejectAgentRequest",
    ADMIN_BLOCK_PACKAGE:'/admin/block-package',
    ADMIN_PACKAGES:'/admin/packages',
    ADMIN_DSAHBOARD:'/admin/dashboard',
}

export const Auth_Route={
    LOGIN : '/login',
    FORGOT_PASSWORD : '/forgotPassword',
    REGISTER : '/register',
    RESET_PASSWORD : 'resetPassword',
    OTP :   '/otp',
    RESEND_OTP :'/resendOtp',
    LOGOUT :'/logout'
}

export const Booking_Route = {
    USER_BOOKING : '/user/booking',
    USER_BOOKING_ID:'/user/booking',
    AGENT_BOOKING : '/agent/booking',
    ADMIN_BOOKING : '/admin/booking',
    USER_BOOKING_CANCEL:'/user/booking/cancel',
    AGENT_BOOKING_PACKAGE :'/agent/bookings/package',
    USER_BOOKING_VALIDATE :'/user/bookings/validate'
}

export const Chat_Route = {
    CHATS_USERS : '/chats/users',
    CHATS_MESSAGES : '/chats/messages',
    USERS_DETAILS : '/user/users/details',
}

export const Notification_Route ={
    NOTIFICATIONS : '/notifications',
}

export const Package_Route = {
    AGENT_PACKAGES :'/agent/packages',
    AGENT_CATEGORIES :'/agent/categories',
    AGENT_PRESIGNED_URL :'/agent/getPresignedUrls',
    AGENT_EDIT_PACKAGE : '/agent/edit-package',
    AGENT_DELETE_IMAGE :'/agent/delete-image',
    ADMIN_PACKAGES_VERIFY :'/admin/packages/verify'
}
export const USER_ROUTE = {
    USER_CATEGORY :'/user/category',
    USER_PACKAGES_CATEGORY:`/user/packages-category`,
    ADVANCE_SEARCH:`/user/advance-search`,
    STRIPE_PAYMENT:'/user/stripe-payment',
    USER_WISHLIST: '/user/wishlist',
    USER_REVIEW :'/user/review',
    USER_REVIEWS: '/user/reviews',
    USER_WALLETS:'/user/wallets',
    USER_AGENTS_DATA:'/user/agents/data',
}