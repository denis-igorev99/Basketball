<script lang="ts" setup>
import { usePlayerStore } from "@/entities";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const props = defineProps({
  /**
   * * Идентификатор команды
   */
  teamId: {
    type: Number,
    required: true,
  },
});

/**
 * * Стор для работы с игроками
 */
const { teamPleyars } = storeToRefs(usePlayerStore());
const { getTeamPlayers } = usePlayerStore();

onMounted(async () => {
  await getTeamPlayers(props.teamId);
});
</script>

<template>
  <div class="player-table-wrap">
    <div class="player-table">
      <div class="info">Roster</div>
      <div class="table">
        <div class="header">
          <div class="td">#</div>
          <div class="td">Player</div>
          <div class="td">Height</div>
          <div class="td">Weight</div>
          <div class="td">Age</div>
        </div>

        <div class="tr" v-for="player in teamPleyars" :key="player.Id">
          <div class="td">{{ player.Number }}</div>
          <div class="td">
            <div class="player-info">
              <img
                width="52"
                height="38"
                :src="player.AvatarUrl"
                alt="Avatar"
              />
              <div class="initials">
                <div class="player-name">{{ player.Name }}</div>
                <div class="player-position">{{ player.Position }}</div>
              </div>
            </div>
          </div>
          <div class="td">{{ player.Height }} cm</div>
          <div class="td">{{ player.Weight }} kg</div>
          <div class="td">{{ player.Age }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-table-wrap {
  width: 100%;
  overflow-x: auto;
  .player-table {
    color: $gray;
    background-color: #fff;
    min-width: 600px;

    .info {
      font-size: 15px;
      line-height: 24px;
      padding: 12px 16px;
      border-bottom: 1px solid $light-gray;
    }

    .table {
      > div:not(:last-child) {
        border-bottom: 1px solid $light-gray;
      }
    }

    .tr,
    .header {
      display: grid;
      grid-template-columns: 40px auto 70px 70px 28px;
    }

    .header {
      padding: 8px 16px;
    }

    .td {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 15px;
      line-height: 24px;
    }

    .tr {
      padding: 6px 16px;
    }

    .player-info {
      display: flex;
      align-items: center;
      column-gap: 10px;
      .initials {
        display: flex;
        flex-direction: column;
        row-gap: 2px;
        .player-name {
          font-size: 15px;
          line-height: 24px;
        }
        .player-position {
          font-size: 13px;
          line-height: 18px;
        }
      }
    }

    @include media(">large-desktop") {
      .info {
        font-size: 18px;
        line-height: 26px;
        padding: 14px 32px;
      }

      .tr,
      .header {
        display: grid;
        grid-template-columns: 56px 1fr 130px 130px 28px;
      }

      .header {
        padding: 10px 32px;
      }

      .td {
        font-size: 14px;
        line-height: 20px;
      }

      .tr {
        padding: 6px 32px;
      }

      .player-info {
        .initials {
          .player-name {
            font-size: 14px;
            line-height: 21px;
          }
          .player-position {
            font-size: 12px;
            line-height: 21px;
          }
        }
      }
    }
  }

  @include media(">tablet") {
    border: 1px solid $light-gray;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
