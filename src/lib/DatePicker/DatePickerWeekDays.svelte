<script lang="ts">
  import { getDayName } from "./utils";
</script>

<section class="week-days">
  {#each Array.from({ length: 7 }) as _, index}
    <span>{getDayName(index)}</span>
  {/each}
</section>
