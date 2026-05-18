import { EBuckets } from '@/shared/ui/data/enums';
import { createClient } from '@supabase/supabase-js';

const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.SUPABASE_SERVICE_ROLE_KEY ?? '');

async function main() {
  await admin.storage.createBucket(EBuckets.AVATARS_BUCKET, {
    public: true,
  });
}

main();
