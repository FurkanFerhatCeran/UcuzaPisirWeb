import { NextResponse } from 'next/server';
import connectToMongoDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    // MongoDB'ye bağlan
    await connectToMongoDB();
    
    // Bağlantı durumunu kontrol et
    const connectionState = mongoose.connection.readyState;
    const connectionStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    // Veritabanı bağlantısı kurulamadıysa hata döndür
    if (connectionState !== 1) { // 1 = connected
      return NextResponse.json({
        success: false,
        message: 'Veritabanı bağlantısı kurulamadı',
        connection: {
          state: connectionStates[connectionState]
        }
      }, { status: 500 });
    }
    
    // MongoDB sunucu bilgisini güvenli bir şekilde almaya çalış
    let serverInfo = null;
    try {
      // Admin yetkisi gerektiren işlemler hata verebilir
      serverInfo = await mongoose.connection.db.admin().serverInfo();
    } catch (adminError) {
      console.warn('Admin yetkisi gerektiği için sunucu bilgisi alınamadı:', adminError.message);
      // Hata oluşsa bile devam et, sadece bilgi eksik olacak
    }
    
    return NextResponse.json({
      success: true,
      connection: {
        state: connectionStates[connectionState],
        database: mongoose.connection.db.databaseName,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
      },
      serverInfo: serverInfo ? {
        version: serverInfo.version,
        gitVersion: serverInfo.gitVersion,
        uptime: serverInfo.uptime,
        localTime: new Date().toISOString()
      } : null
    });
  } catch (error) {
    console.error('MongoDB API hatası:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Veritabanı bağlantısı veya sorgu hatası',
        error: error.message 
      },
      { status: 500 }
    );
  }
} 