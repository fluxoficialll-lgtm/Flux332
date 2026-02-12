
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

const Groups = lazy(() => import('../../pages/Groups').then(m => ({ default: m.Groups })));
const GroupChat = lazy(() => import('../../pages/GroupChat').then(m => ({ default: m.GroupChat })));
const GroupLanding = lazy(() => import('../../pages/GroupLanding').then(m => ({ default: m.GroupLanding })));
const CreateGroup = lazy(() => import('../../pages/CreateGroup').then(m => ({ default: m.CreateGroup })));
const CreateVipGroup = lazy(() => import('../../pages/CreateVipGroup').then(m => ({ default: m.CreateVipGroup })));
const CreatePublicGroup = lazy(() => import('../../pages/CreatePublicGroup').then(m => ({ default: m.CreatePublicGroup })));
const CreatePrivateGroup = lazy(() => import('../../pages/CreatePrivateGroup').then(m => ({ default: m.CreatePrivateGroup })));
const EditGroup = lazy(() => import('../../pages/EditGroup').then(m => ({ default: m.EditGroup })));
const VipGroupSales = lazy(() => import('../../pages/VipGroupSales').then(m => ({ default: m.VipGroupSales })));
const GroupSettings = lazy(() => import('../../pages/GroupSettings').then(m => ({ default: m.GroupSettings })));
const SuccessBridge = lazy(() => import('../../pages/SuccessBridge').then(m => ({ default: m.SuccessBridge })));
const GroupInfoPage = lazy(() => import('../../pages/groups/settings/GroupInfoPage').then(m => ({ default: m.GroupInfoPage })));
const GroupAccessPage = lazy(() => import('../../pages/groups/settings/GroupAccessPage').then(m => ({ default: m.GroupAccessPage })));
const GroupModerationPage = lazy(() => import('../../pages/groups/settings/GroupModerationPage').then(m => ({ default: m.GroupModerationPage })));
const GroupMembersPage = lazy(() => import('../../pages/groups/settings/GroupMembersPage').then(m => ({ default: m.GroupMembersPage })));
const GroupVipPage = lazy(() => import('../../pages/groups/settings/GroupVipPage').then(m => ({ default: m.GroupVipPage })));
const GroupStatisticsPage = lazy(() => import('../../pages/groups/settings/GroupStatisticsPage').then(m => ({ default: m.GroupStatisticsPage })));
const GroupAuditLogs = lazy(() => import('../../pages/groups/settings/GroupAuditLogs').then(m => ({ default: m.GroupAuditLogs })));
const GroupChannelsPage = lazy(() => import('../../pages/groups/settings/GroupChannelsPage').then(m => ({ default: m.GroupChannelsPage })));
const GroupSchedule = lazy(() => import('../../pages/groups/settings/GroupSchedule').then(m => ({ default: m.GroupSchedule })));
const GroupSalesPlatformPage = lazy(() => import('../../pages/groups/settings/GroupSalesPlatformPage').then(m => ({ default: m.GroupSalesPlatformPage })));
const GroupSalesPlatformView = lazy(() => import('../../pages/groups/GroupSalesPlatformView').then(m => ({ default: m.GroupSalesPlatformView })));
const SalesFolderContentPage = lazy(() => import('../../pages/groups/SalesFolderContentPage').then(m => ({ default: m.SalesFolderContentPage })));
const GroupRolesPage = lazy(() => import('../../pages/groups/settings/GroupRolesPage').then(m => ({ default: m.GroupRolesPage })));
const GroupChannelsList = lazy(() => import('../../pages/groups/GroupChannelsList').then(m => ({ default: m.GroupChannelsList })));
const GroupCheckoutConfigPage = lazy(() => import('../../pages/groups/settings/GroupCheckoutConfigPage').then(m => ({ default: m.GroupCheckoutConfigPage })));
const GroupLimits = lazy(() => import('../../pages/LimitAndControl').then(m => ({ default: m.LimitAndControl })));
const ManageGroupLinks = lazy(() => import('../../pages/ManageGroupLinks').then(m => ({ default: m.ManageGroupLinks })));
const GroupRevenue = lazy(() => import('../../pages/GroupRevenue').then(m => ({ default: m.GroupRevenue })));
const VipSalesHistory = lazy(() => import('../../pages/VipSalesHistory').then(m => ({ default: m.VipSalesHistory })));

const GroupRoutes = () => (
  <>
    <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
    <Route path="/group-chat/:id" element={<ProtectedRoute><GroupChat /></ProtectedRoute>} />
    <Route path="/group-chat/:id/:channelId" element={<ProtectedRoute><GroupChat /></ProtectedRoute>} />
    <Route path="/group/:id/channels" element={<ProtectedRoute><GroupChannelsList /></ProtectedRoute>} />
    <Route path="/group-landing/:id" element={<GroupLanding />} />
    <Route path="/vip-group-sales/:id" element={<VipGroupSales />} />
    <Route path="/create-group" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
    <Route path="/create-group/vip" element={<ProtectedRoute><CreateVipGroup /></ProtectedRoute>} />
    <Route path="/create-group/public" element={<ProtectedRoute><CreatePublicGroup /></ProtectedRoute>} />
    <Route path="/create-group/private" element={<ProtectedRoute><CreatePrivateGroup /></ProtectedRoute>} />
    <Route path="/edit-group/:id" element={<ProtectedRoute><EditGroup /></ProtectedRoute>} />
    <Route path="/payment-success-bridge/:id" element={<ProtectedRoute><SuccessBridge /></ProtectedRoute>} />
    <Route path="/group-settings/:id" element={<ProtectedRoute><GroupSettings /></ProtectedRoute>} />
    <Route path="/group-settings/:id/info" element={<ProtectedRoute><GroupInfoPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/access" element={<ProtectedRoute><GroupAccessPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/moderation" element={<ProtectedRoute><GroupModerationPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/members" element={<ProtectedRoute><GroupMembersPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/roles" element={<ProtectedRoute><GroupRolesPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/vip" element={<ProtectedRoute><GroupVipPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/stats" element={<ProtectedRoute><GroupStatisticsPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/audit" element={<ProtectedRoute><GroupAuditLogs /></ProtectedRoute>} />
    <Route path="/group-settings/:id/channels" element={<ProtectedRoute><GroupChannelsPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/schedule" element={<ProtectedRoute><GroupSchedule /></ProtectedRoute>} />
    <Route path="/group-settings/:id/sales-platform" element={<ProtectedRoute><GroupSalesPlatformPage /></ProtectedRoute>} />
    <Route path="/group-settings/:id/checkout-config" element={<ProtectedRoute><GroupCheckoutConfigPage /></ProtectedRoute>} />
    <Route path="/group-platform/:id" element={<ProtectedRoute><GroupSalesPlatformView /></ProtectedRoute>} />
    <Route path="/group-folder/:groupId/:folderId" element={<ProtectedRoute><SalesFolderContentPage /></ProtectedRoute>} />
    <Route path="/group-limits/:id" element={<ProtectedRoute><GroupLimits /></ProtectedRoute>} />
    <Route path="/group-links/:id" element={<ProtectedRoute><ManageGroupLinks /></ProtectedRoute>} />
    <Route path="/group-revenue/:id" element={<ProtectedRoute><GroupRevenue /></ProtectedRoute>} />
    <Route path="/vip-sales-history/:id" element={<ProtectedRoute><VipSalesHistory /></ProtectedRoute>} />
  </>
);

export default GroupRoutes;
