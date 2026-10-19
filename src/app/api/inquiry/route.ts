import { NextResponse } from 'next/server';
import {z} from 'zod';
import {createClient} from '@supabase/supabase-js';
export const runtime='nodejs';
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.string().email().max(180),organization:z.string().max(160).optional(),message:z.string().max(1500).optional(),website:z.string().optional()});
export async function POST(request:Request){
 let body:unknown;
 try{body=await request.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 const parsed=schema.safeParse(body);
 if(!parsed.success)return NextResponse.json({error:'Please review the required fields.'},{status:400});
 if(parsed.data.website)return NextResponse.json({ok:true}); // simple honeypot; production needs real abuse controls
 const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({error:'Lead storage has not been configured.'},{status:503});
 try{
  const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {error}=await client.from('investor_inquiries').insert({name:parsed.data.name,email:parsed.data.email,organization:parsed.data.organization||null,message:parsed.data.message||null,source:'el-porvenir-website'});
  if(error){console.error('Lead insertion error:',error.code);return NextResponse.json({error:'Unable to store inquiry.'},{status:500})}
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Unable to store inquiry.'},{status:500})}
}
