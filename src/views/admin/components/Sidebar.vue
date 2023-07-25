<template>
  <aside>
    <nav>
      <ul>
        <li
          :class="$route.name === link.name ? 'current' : null"
          v-for="(link, index) in links"
          :key="index"
        >
          <router-link :to="link.name ? { name: link.name } : '#'">
            <BootstrapIcon :icon="link.icon" class="nav-left-icon" />
            {{ link.label }}
            <BootstrapIcon
              icon="chevron-right"
              v-if="link.children?.length"
              class="nav-right-icon"
            />
          </router-link>

          <ul v-if="link.children?.length">
            <li v-for="(clink, index2) in link.children" :key="index2">
              <router-link :to="clink.name ? { name: clink.name } : '#'">
                <BootstrapIcon icon="circle" class="nav-left-icon" />

                {{ clink.label }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { sidebar_links } from "./sidebar_links";
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

export default {
  name: "AdminSidebar",
  data() {
    return {
      links: sidebar_links,
    };
  },
  components: {
    BootstrapIcon,
  },
  setup() {
    $(function () {
      $(document).on("click", "nav>ul>li>a", function (event) {
        event.preventDefault();

        let parent = $(this).closest("li");
        parent.toggleClass("current");
        parent.find("ul").slideToggle();

        let other_parent = $("nav>ul>li>a").not(this).closest("li");
        other_parent.removeClass("current");
        other_parent.find("ul").slideUp("current");
      });
    });
  },
  mounted() {
    //
  },
};
</script>

<style scoped lang="scss">
aside {
  min-width: 260px;
  width: 260px;
  background-color: #fff;
  border-right: 1px solid #d9d9d9;
  overflow: auto;
  padding: 15px;

  nav > ul {
    margin: 0;
    padding: 0;
    list-style: none;

    & > li {
      margin-bottom: 10px;

      & > a {
        display: flex;
        color: #093333;
        padding: 10px 15px;
        border-radius: 5px;
        text-decoration: none;
        align-items: center;

        .nav-left-icon {
          width: 16px;
          margin-right: 10px;
        }
        .nav-right-icon {
          transition: all ease 500ms;
          margin-left: auto;
        }
      }

      &:hover > a,
      &.current > a,
      &.active > a {
        background-color: #c08d20dc;
        color: #fff;
      }

      &.current {
        & > a > .nav-right-icon {
          transform: rotate(90deg);
        }
      }

      ul {
        margin: 10px 0;
        padding: 0;
        list-style: none;
        display: none;

        li {
          a {
            color: inherit;
            text-decoration: none;
            padding: 8px 15px;
            font-size: 12px;
            display: flex;
            align-items: center;

            .nav-left-icon {
              width: 10px;
              height: 10px;
              margin-right: 10px;
            }
          }

          &:hover {
            color: #ff9e43;
          }
        }
      }
    }
  }
}
</style>
