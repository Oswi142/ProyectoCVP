import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const router = Router();

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

// ✅ Endpoint de login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string; password: string } = req.body;

  try {
    const result = await pool.query<User>('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rowCount === 0) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);;
    const hashedPassword = await bcrypt.hash('client123', 10);
    console.log('CONTRASEÑA ENVIADA', hashedPassword);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      (process.env.JWT_SECRET as string) || 'defaultSecret',
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ✅ Exportamos router, NO app
export default router;
