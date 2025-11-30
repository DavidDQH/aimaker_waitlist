import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // 验证邮箱格式
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingEmail = await prisma.waitlist.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: '该邮箱已经在等待列表中了' },
        { status: 409 }
      )
    }

    // 保存邮箱到数据库
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email: email.toLowerCase()
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: '成功加入等待列表！',
        id: waitlistEntry.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: '服务器错误，请稍后再试' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await prisma.waitlist.count()
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return NextResponse.json(
      { error: '获取数据失败' },
      { status: 500 }
    )
  }
}

