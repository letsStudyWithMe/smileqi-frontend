<template>
  <div class="container">
    <Breadcrumb :items="['menu.user.setting', 'menu.user.central']" />
    <a-card :bordered="false" :title="$t('menu.user.central')">
      <div class="box-wrapper">
        <div class="info-wrapper">
          <div class="avatar-wrapper">
            <div class="avatar" :class="{ 'avatar-touch': touched, 'avatar-end': uploaded }">
              <img :src="avatar" />
            </div>
          </div>
          <a-card class="general-card" :title="$t('menu.user.info')">
            <a-row>
              <a-col :flex="1">
                <a-form
                  :label-col-props="{ span: 6 }"
                  :wrapper-col-props="{ span: 18 }"
                  label-align="left"
                >
                  <a-row :gutter="16">
                    <a-col :span="8">
                      <a-form-item
                        field="nickName" :label="$t('suersetting.usercentral.name')"
                      >
                        <a-input
                          v-model=nickName
                          :disabled="true"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item field="userRole" :label="$t('suersetting.usercentral.role')">
                        <a-input
                          v-model="userRole"
                          :disabled="true"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-col>
            </a-row>
          </a-card>
          <a-divider style="margin-top: 0" />
          <a-card class="general-card" :title="$t('menu.user.updatePassword')">
            <a-form
              :model="updatePasswordPar"
              :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
            >
              <a-col :span="8">
                <a-form-item
                  field="userPasswordLater"
                  :label="$t('suersetting.usercentral.laterPassword')"
                >
                  <a-input-password
                    v-model=updatePasswordPar.userPasswordLater
                    :placeholder="$t('suersetting.usercentral.laterPassword.placeholder')"
                  >
                    <template #prefix>
                      <icon-lock />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="userPassword"
                  :label="$t('suersetting.usercentral.userPassword')"
                >
                  <a-input-password
                    v-model=updatePasswordPar.userPassword
                    :placeholder="$t('suersetting.usercentral.userPassword.placeholder')"
                  >
                    <template #prefix>
                      <icon-lock />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="userPasswordCheck" :label="$t('suersetting.usercentral.checkPassword')">
                  <a-input-password
                    v-model="updatePasswordPar.userPasswordCheck"
                    :placeholder="$t('suersetting.usercentral.checkPassword.placeholder')"
                  >
                    <template #prefix>
                      <icon-lock />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-col>
            </a-form>
            <a-button type="primary" @click="updatePas(updatePasswordPar)">
              {{ $t("menu.user.updatePassword") }}
            </a-button>
          </a-card>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import useUserStore from '@/store/modules/user'
import { defineComponent, ref } from 'vue'
import { useI18n } from "vue-i18n";
import Avatar from '@/assets/images/img_avatar.gif'
import { updatePasswordInfo } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import useUser from "@/hooks/user";

export default defineComponent({
  name: 'Personal',
  setup() {
    const touched = ref(false)
    const uploaded = ref(false)
    const { t } = useI18n();
    const { logout } = useUser();
    const avatarTouchStart = () => {
      touched.value = true
    }
    const updatePasswordParams = () => {
      return {
        userPasswordLater: "",
        userPassword: "",
        userPasswordCheck: ""
      };
    };
    const updatePasswordPar = ref(updatePasswordParams());
    const defaultAvatar = Avatar
    const uploadAvatar = () => {
      uploaded.value = true
      setTimeout(() => {
        touched.value = false
        uploaded.value = false
      }, 1000)
    }
    const updatePas = async (params:any) => {
      console.log(params)
      if (params.userPassword !== params.userPasswordCheck){
        Message.error({
          content: t("suersetting.usercentral.checkPassword.same"),
          duration: 5 * 1000,
        });
        return;
      }
      let res = {} as any;
      res = await updatePasswordInfo(params);
      if (res.code !== 0) {
        Message.error({
          content: res.message,
          duration: 5 * 1000,
        });
      } else {
        Message.success({
          content: "SUCCESS",
          duration: 5 * 1000,
        });
      }
      logout();
    };
    const userStore = useUserStore()
    return {
      touched,
      uploaded,
      avatar: defaultAvatar,
      nickName: userStore.userName,
      userRole: userStore.userRole,
      avatarTouchStart,
      uploadAvatar,
      updatePasswordPar,
      updatePas,
    }
  },
})
</script>
<style lang="less" scoped>
.box-wrapper {
    .info-wrapper {
      text-align: center;
      .avatar-wrapper {
        display: inline-block;
        width: 6rem;
        height: 6rem;
        margin-top: 20px;
        position: relative;
        .avatar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform-origin: bottom;
          transform: rotate(0deg);
          z-index: 1;
          transition: all 0.5s ease-in-out;
          & > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgb(0, 255, 255);
          }
        }
        .avatar-touch {
          transform: rotate(180deg);
        }
        .avatar-end {
          transform: rotate(0deg);
        }
        .camera-layer {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
        }
      }
      .des-wrapper {
        width: 70%;
        margin: 0 auto;
        font-size: 14px;
        padding: 15px;
      }
      .text-wrapper {
        font-size: 1.0rem;
        margin-top: 20px;
        width: 50%;
        margin: 0 auto;
        .label {
          display: inline-block;
          width: 50%;
          text-align: right;
        }
        .value {
          display: inline-block;
          width: 50%;
          text-align: left;
        }
      }
      .text-wrapper + .text-wrapper {
        margin-top: 15px;
      }
    }
  .message-wrapper {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
    .notify {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .message-title {
      font-size: 14px;
    }
    .content {
      font-size: 12px;
      margin-top: 10px;
      line-height: 1rem;
    }
  }
  .message-wrapper + .message-wrapper {
    margin-top: 10px;
  }
  .wating-box {
    width: 30%;
    margin-left: 10px;
    .wating-item {
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
</style>
